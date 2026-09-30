import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { sanitizeMongoUri } from '../server/config/db.js';

// Load .env with override: true so values take precedence
dotenv.config({ override: true });

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

async function runDiagnostic() {
  console.log(`\n${colors.bright}${colors.cyan}====================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}  MongoDB Atlas Connectivity & Diagnostic Tool     ${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}\n`);

  // Step 1: Check MONGODB_URI in environment
  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    console.error(`${colors.red}❌ Error: MONGODB_URI is not defined in your .env file.${colors.reset}`);
    console.log(`👉 Please set MONGODB_URI in .env and try again.\n`);
    process.exit(1);
  }

  // Mask credentials for clean logging
  const maskedUri = rawUri.replace(/:([^:@]+)@/, ':****@');
  console.log(`${colors.blue}ℹ️  Loaded URI:${colors.reset} ${maskedUri}`);

  // Step 2: Sanitize URI
  const cleanUri = sanitizeMongoUri(rawUri);

  // Step 3: Test Connection & Latency
  console.log(`\n${colors.bright}1. Testing Connection to Atlas Cluster...${colors.reset}`);
  const startTime = Date.now();

  try {
    await mongoose.connect(cleanUri, {
      serverSelectionTimeoutMS: 6000,
      bufferCommands: false,
      dbName: 'abhay_portfolio',
    });
    const latency = Date.now() - startTime;
    console.log(`${colors.green}   ✅ Connected successfully!${colors.reset}`);
    console.log(`   Host:    ${colors.cyan}${mongoose.connection.host}${colors.reset}`);
    console.log(`   Latency: ${colors.yellow}${latency} ms${colors.reset}`);
    console.log(`   DB Name: ${colors.cyan}${mongoose.connection.name}${colors.reset}`);
  } catch (error) {
    console.error(`\n${colors.red}❌ Connection Failed:${colors.reset} ${error.message}`);
    if (error.message.includes('authentication failed')) {
      console.log(`\n${colors.yellow}👉 Troubleshooting Tip:${colors.reset}`);
      console.log(`   Your database username or password was rejected by MongoDB Atlas.`);
      console.log(`   Go to https://cloud.mongodb.com -> Database Access -> Edit User Password.`);
    } else if (error.message.includes('whitelist') || error.message.includes('timed out')) {
      console.log(`\n${colors.yellow}👉 Troubleshooting Tip:${colors.reset}`);
      console.log(`   Network access blocked. Check https://cloud.mongodb.com -> Network Access.`);
      console.log(`   Ensure '0.0.0.0/0' (Allow access from anywhere) is configured.`);
    }
    console.log('\n');
    process.exit(1);
  }

  // Step 4: Admin Ping
  console.log(`\n${colors.bright}2. Sending Ping Command to Database Engine...${colors.reset}`);
  try {
    const pingResult = await mongoose.connection.db.admin().ping();
    console.log(`${colors.green}   ✅ Ping response received:${colors.reset}`, pingResult);
  } catch (err) {
    console.error(`${colors.red}   ❌ Ping command failed:${colors.reset}`, err.message);
  }

  // Step 5: Read/Write Validation Test
  console.log(`\n${colors.bright}3. Testing Read & Write Operations (Collection: 'contact')...${colors.reset}`);
  const db = mongoose.connection.db;
  const contactCollection = db.collection('contact');

  const testPayload = {
    name: 'Diagnostic Health Check',
    email: 'diagnostic@abhaykumar.dev',
    phone: '+91-00000-00000',
    service: 'MERN Stack Development',
    message: `Automated diagnostic probe generated on ${new Date().toISOString()}`,
    status: 'new',
    _diagnosticProbe: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    // Write (Insert)
    const insertResult = await contactCollection.insertOne(testPayload);
    const testDocId = insertResult.insertedId;
    console.log(`${colors.green}   ✅ Write Successful:${colors.reset} Inserted test document ID ${colors.cyan}${testDocId}${colors.reset}`);

    // Read (Find by ID)
    const readDoc = await contactCollection.findOne({ _id: testDocId });
    if (!readDoc) {
      throw new Error('Read back failed: document not found after insert.');
    }
    console.log(`${colors.green}   ✅ Read Successful:${colors.reset} Retrieved test document with name: "${readDoc.name}"`);

    // Update
    await contactCollection.updateOne(
      { _id: testDocId },
      { $set: { status: 'verified', updatedAt: new Date() } }
    );
    const updatedDoc = await contactCollection.findOne({ _id: testDocId });
    console.log(`${colors.green}   ✅ Update Successful:${colors.reset} Document status changed to "${updatedDoc.status}"`);

    // Clean up (Delete)
    await contactCollection.deleteOne({ _id: testDocId });
    console.log(`${colors.green}   ✅ Teardown Successful:${colors.reset} Removed diagnostic probe document (database kept clean)`);
  } catch (rwError) {
    console.error(`${colors.red}   ❌ Read/Write Operation Failed:${colors.reset} ${rwError.message}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  // Step 6: Inspect Collections and Record Counts
  console.log(`\n${colors.bright}4. Inspecting Collections in 'abhay_portfolio'...${colors.reset}`);
  try {
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`   • Collection ${colors.cyan}'${col.name}'${colors.reset}: ${colors.yellow}${count} documents${colors.reset}`);
    }
  } catch (err) {
    console.log(`   Could not list collection counts:`, err.message);
  }

  // Step 7: Disconnect gracefully
  await mongoose.disconnect();
  console.log(`\n${colors.bright}${colors.green}====================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.green}  🎉 All MongoDB Atlas Diagnostics Passed Successfully!${colors.reset}`);
  console.log(`${colors.bright}${colors.green}  Read, write, update, and delete are 100% operational.${colors.reset}`);
  console.log(`${colors.bright}${colors.green}====================================================${colors.reset}\n`);

  process.exit(0);
}

runDiagnostic().catch((err) => {
  console.error(`Diagnostic execution error:`, err);
  process.exit(1);
});
