import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import { initializeDatabase, processWhatsAppPayload } from './processor';
import { rawPayloads } from './payloads';
import { getConversations, getConversationById } from './controllers/chatController'; // Add this import

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection state flag
let isDatabaseConnected = false;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    database: isDatabaseConnected ? 'CONNECTED' : 'DISCONNECTED',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/', (req, res) => {
  res.send('WhatsApp Webhook Processor is running!');
});

// Initialize database with sample data
app.post('/api/initialize-database', async (req, res) => {
  try {
    await initializeDatabase(rawPayloads);
    res.json({ message: 'WhatsApp database initialized successfully.' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

// Webhook endpoint for real-time processing
app.post('/api/webhook', async (req, res) => {
  try {
    const payload = req.body;
    await processWhatsAppPayload(payload);
    res.status(200).send('WhatsApp webhook processed successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing WhatsApp webhook');
  }
});

// Conversation endpoints
app.get('/api/conversations', getConversations); // Add this route
app.get('/api/conversations/:id', getConversationById); // Add this route

async function startServer() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    isDatabaseConnected = true;
    console.log('Database connection established');

    app.listen(port, () => {
      console.log(`WhatsApp Webhook Processor running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});