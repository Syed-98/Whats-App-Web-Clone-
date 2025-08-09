import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  throw new Error('Missing MONGO_URI in .env file');
}
if (!process.env.DB_NAME) {
  throw new Error('Missing DB_NAME in .env file');
}

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// Create a cached connection to avoid reconnecting on every request
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Create a new MongoClient
    const client = new MongoClient(mongoUri, {
      serverApi: {
        version: '1', // Using Stable API
        strict: true,
        deprecationErrors: true,
      }
    });

    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Successfully connected to MongoDB!');

    // Select the database
    const db = client.db(dbName);

    // Cache the client and db
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

export function getDb(): Db {
  if (!cachedDb) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return cachedDb;
}

// Optional: Graceful shutdown handler
process.on('SIGINT', async () => {
  if (cachedClient) {
    await cachedClient.close();
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  }
});