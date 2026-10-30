import { MongoClient } from 'mongodb';

// One cached connection, reused across hot reloads and serverless invocations.
export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  globalThis._mongo ??= new MongoClient(uri).connect();
  return (await globalThis._mongo).db(process.env.MONGODB_DB || 'byteethic');
}
