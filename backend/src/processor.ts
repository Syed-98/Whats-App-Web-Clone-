import { getDb } from './database';
import { RawPayload, ProcessedMessage } from './types';

export async function processWhatsAppPayload(payload: RawPayload): Promise<void> {
  const db = getDb();
  const messagesCollection = db.collection<ProcessedMessage>('processed_messages');

  for (const entry of payload.metaData.entry) {
    for (const change of entry.changes) {
      const phoneNumberId = change.value.metadata.phone_number_id;
      const displayPhoneNumber = change.value.metadata.display_phone_number;
      const appId = payload.metaData.gs_app_id;
      
      // Process messages
      if (change.value.messages) {
        for (const message of change.value.messages) {
          const contact = change.value.contacts?.find(c => c.wa_id === message.from);
          
          const processedMessage: ProcessedMessage = {
            messageId: message.id,
            conversationId: payload._id.split('-')[0], // Extract conv1, conv2 etc.
            body: message.text?.body || '',
            from: message.from,
            to: phoneNumberId,
            timestamp: new Date(parseInt(message.timestamp) * 1000),
            status: 'received',
            type: message.type,
            contactName: contact?.profile.name,
            phoneNumberId,
            displayPhoneNumber,
            appId,
            lastUpdated: new Date()
          };

          await messagesCollection.updateOne(
            { messageId: message.id },
            { $set: processedMessage },
            { upsert: true }
          );
        }
      }

      // Process status updates
      if (change.value.statuses) {
        for (const status of change.value.statuses) {
          await messagesCollection.updateOne(
            { messageId: status.id },
            { 
              $set: { 
                status: status.status,
                lastUpdated: new Date(parseInt(status.timestamp) * 1000) // Fixed this line
              } 
            }
          );
        }
      }
    }
  }
}

export async function initializeDatabase(payloads: RawPayload[]): Promise<void> {
  try {
    console.log('Starting database initialization with WhatsApp payloads...');
    
    for (const payload of payloads) {
      await processWhatsAppPayload(payload);
      console.log(`Processed payload: ${payload._id}`);
    }
    
    console.log('WhatsApp database initialization completed');
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
}