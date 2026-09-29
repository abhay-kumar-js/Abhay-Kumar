import mongoose from 'mongoose';

mongoose.set('bufferCommands', false); // Fail fast, don't hang

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('ℹ️  MONGODB_URI not provided. Running with built-in persistent local store.');
    return false;
  }

  // Detect unreplaced placeholder like <db_username> or <password>
  if (uri.includes('<db_username>') || uri.includes('<password>') || /<[^>]+>/.test(uri)) {
    console.warn(
      '⚠️ MONGODB_URI contains unreplaced placeholder like <db_username>. Please replace <db_username> with your Atlas database username.'
    );
    console.log('Falling back to local persistent store for uninterrupted operation.');
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
      dbName: 'abhay_portfolio', // Ensures documents are stored in abhay_portfolio collection
    });
    isConnected = !!conn.connections[0].readyState;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.log('Falling back to local persistent store for smooth operation.');
    return false;
  }
};

export const getIsConnected = () => isConnected;
