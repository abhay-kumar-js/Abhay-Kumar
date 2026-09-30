import mongoose from 'mongoose';

mongoose.set('bufferCommands', false); // Fail fast, don't hang

let isConnected = false;

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

export const connectDB = async () => {
  const rawUri = process.env.MONGODB_URI;

  if (!rawUri) {
    console.log('ℹ️  MONGODB_URI not provided. Running with built-in persistent local store.');
    return false;
  }

  // Detect unreplaced placeholder like <db_username> or <password>
  if (rawUri.includes('<db_username>') || rawUri.includes('<password>') || /<[^>]+>/.test(rawUri)) {
    console.warn(
      '⚠️ MONGODB_URI contains unreplaced placeholder like <db_username>. Please replace <db_username> with your Atlas database username.'
    );
    console.log('Falling back to local persistent store for uninterrupted operation.');
    return false;
  }

  if (isConnected) {
    return true;
  }

  const cleanUri = sanitizeMongoUri(rawUri);

  try {
    const conn = await mongoose.connect(cleanUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6000,
      dbName: 'abhay_portfolio', // Ensures documents are stored in abhay_portfolio collection
    });
    isConnected = !!conn.connections[0].readyState;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} [Database: abhay_portfolio]`);
    return true;
  } catch (error) {
    if (error.message.includes('authentication failed')) {
      console.error(
        `⚠️ MongoDB Atlas Authentication Failed: The database username or password in MONGODB_URI was rejected by Atlas.`
      );
      console.error(
        `👉 To fix: In MongoDB Atlas (cloud.mongodb.com), go to 'Database Access', click 'Edit' on user 'aabhaykumar469_db_user', choose 'Edit Password', and make sure your password matches MONGODB_URI.`
      );
    } else if (error.message.includes('whitelist') || error.message.includes('timed out')) {
      console.error(
        `⚠️ MongoDB Atlas Network Error: Could not reach cluster. Ensure Network Access in Atlas includes '0.0.0.0/0' (Allow Access From Anywhere).`
      );
    } else {
      console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    }
    console.log('Falling back to local persistent store for smooth operation.');
    return false;
  }
};

export const getIsConnected = () => isConnected;
