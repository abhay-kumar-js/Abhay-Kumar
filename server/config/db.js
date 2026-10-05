import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

mongoose.set('bufferCommands', false); // Fail fast, don't hang

let isConnected = false;
let lastConnectionError = null;

/**
 * Loads environment variables from both .env and .env.example across candidate paths.
 * Ensures that deployments (such as Netlify where .env is gitignored and .env.example is committed)
 * or environments with placeholder variables automatically pick up the configured values.
 */
export function loadEnvConfig() {
  const candidateFiles = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.example'),
  ];

  for (const filePath of candidateFiles) {
    try {
      if (fs.existsSync(filePath)) {
        const parsed = dotenv.parse(fs.readFileSync(filePath, 'utf-8'));
        for (const [key, value] of Object.entries(parsed)) {
          const currentVal = process.env[key];
          const isPlaceholder =
            !currentVal ||
            currentVal.includes('<username>') ||
            currentVal.includes('<password>') ||
            currentVal.includes('<db_username>') ||
            currentVal === 'super_secret_jwt_key_change_in_production';

          if (isPlaceholder && value && !value.includes('<username>') && !value.includes('<password>')) {
            process.env[key] = value;
          }
        }
      }
    } catch (_) {
      // Ignore fs errors in restricted runtimes
    }
  }
}

/**
 * Sanitizes and encodes raw MongoDB URIs to prevent common connection bugs:
 * - Unencoded '@' in passwords (which breaks authority parsing)
 * - Malformed query parameters like '?=Cluster0'
 * - Leading/trailing whitespace
 */
export function sanitizeMongoUri(rawUri) {
  if (!rawUri || typeof rawUri !== 'string') return '';
  let uri = rawUri.trim();

  // Fix malformed query syntax like '?=Cluster0'
  uri = uri.replace(/\?=[^&]*/, (match) => {
    const val = match.replace('?=', '');
    return val ? `?appName=${val}` : '?';
  });

  // Handle unencoded special characters like '@' in the password
  const prefixMatch = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^/]+)(.*)$/);
  if (prefixMatch) {
    const scheme = prefixMatch[1];
    const authority = prefixMatch[2];
    const rest = prefixMatch[3];

    const lastAtIndex = authority.lastIndexOf('@');
    if (lastAtIndex > 0) {
      const userInfo = authority.substring(0, lastAtIndex);
      const host = authority.substring(lastAtIndex + 1);

      const firstColonIndex = userInfo.indexOf(':');
      if (firstColonIndex > 0) {
        const username = userInfo.substring(0, firstColonIndex);
        const rawPassword = userInfo.substring(firstColonIndex + 1);

        let cleanPassword = rawPassword;
        try {
          cleanPassword = decodeURIComponent(rawPassword);
        } catch (_) {}

        let cleanUsername = username;
        try {
          cleanUsername = decodeURIComponent(username);
        } catch (_) {}

        const encodedPassword = encodeURIComponent(cleanPassword);
        const encodedUsername = encodeURIComponent(cleanUsername);

        let options = rest;
        if (!options.includes('retryWrites=')) {
          options += (options.includes('?') ? '&' : '?') + 'retryWrites=true&w=majority';
        }

        return `${scheme}${encodedUsername}:${encodedPassword}@${host}${options}`;
      }
    }
  }

  return uri;
}

/**
 * Generates candidate MongoDB URIs to handle cases where the password in Atlas
 * either contains literal '@' (encoded as %40) OR literal '%40' (encoded as %2540).
 */
function getCandidateMongoUris(rawUri) {
  const primary = sanitizeMongoUri(rawUri);
  if (!primary) return [];

  const candidates = [primary];

  // If password in primary has %40 (but not %2540), also try %2540 in case Atlas stores literal '%40'
  if (primary.includes('%40') && !primary.includes('%2540')) {
    candidates.push(primary.replace('%40', '%2540'));
  }
  // If password in primary has %2540, also try %40 in case Atlas stores literal '@'
  else if (primary.includes('%2540')) {
    candidates.push(primary.replace('%2540', '%40'));
  }

  return [...new Set(candidates)];
}

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  loadEnvConfig();

  const rawUri = process.env.MONGODB_URI;

  if (!rawUri) {
    lastConnectionError = 'MONGODB_URI is not defined in environment variables.';
    console.log('ℹ️  MONGODB_URI not provided. Running with built-in persistent local store.');
    return false;
  }

  // Detect unreplaced placeholder like <db_username> or <password>
  if (rawUri.includes('<db_username>') || rawUri.includes('<password>') || /<[^>]+>/.test(rawUri)) {
    lastConnectionError = 'MONGODB_URI contains unreplaced placeholder values.';
    console.warn(
      '⚠️ MONGODB_URI contains unreplaced placeholder like <db_username>. Please replace <db_username> with your Atlas database username.'
    );
    return false;
  }

  const candidateUris = getCandidateMongoUris(rawUri);

  for (let i = 0; i < candidateUris.length; i++) {
    const uriToTry = candidateUris[i];
    try {
      const conn = await mongoose.connect(uriToTry, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 6000,
        dbName: 'abhay_portfolio',
      });
      isConnected = conn.connection.readyState === 1;
      lastConnectionError = null;
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} [Database: abhay_portfolio]`);
      return true;
    } catch (error) {
      lastConnectionError = error.message;
      const isAuthError =
        error.message.includes('authentication failed') || error.message.includes('bad auth');
      // If auth failed and there is another encoding candidate, try the next candidate
      if (isAuthError && i < candidateUris.length - 1) {
        continue;
      }

      if (isAuthError) {
        console.error(
          `⚠️ MongoDB Atlas Authentication Failed: The database username or password in MONGODB_URI was rejected by Atlas.`
        );
      } else if (error.message.includes('whitelist') || error.message.includes('timed out')) {
        console.error(
          `⚠️ MongoDB Atlas Network Error: Could not reach cluster. Ensure Network Access in Atlas includes '0.0.0.0/0' (Allow Access From Anywhere).`
        );
      } else {
        console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
      }
    }
  }

  isConnected = false;
  return false;
};

export const getIsConnected = () => mongoose.connection.readyState === 1;
export const getLastDbError = () => lastConnectionError;
