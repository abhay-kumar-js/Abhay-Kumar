import serverless from 'serverless-http';
import { createApp } from '../../server/server.js';
import { connectDB, getIsConnected } from '../../server/config/db.js';

let cachedHandler;

export const handler = async (event, context) => {
  // Ensure background execution does not freeze Node event loop
  context.callbackWaitsForEmptyEventLoop = false;

  if (!cachedHandler) {
    const app = await createApp();
    cachedHandler = serverless(app);
  } else if (!getIsConnected()) {
    await connectDB();
  }

  return cachedHandler(event, context);
};

export default handler;
