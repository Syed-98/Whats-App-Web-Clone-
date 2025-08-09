import { Request, Response } from 'express';
import { getDb } from '../database';
import { ProcessedMessage } from '../types';

export async function getConversations(req: Request, res: Response) {
  try {
    const db = getDb();
    const messagesCollection = db.collection<ProcessedMessage>('processed_messages');

    // Aggregate messages into conversations
    const conversations = await messagesCollection.aggregate([
      {
        $sort: { timestamp: 1 } // Sort messages by timestamp
      },
      {
        $group: {
          _id: '$conversationId',
          messages: {
            $push: {
              id: '$messageId',
              body: '$body',
              from: '$from',
              to: '$to',
              timestamp: '$timestamp',
              status: '$status',
              type: '$type'
            }
          },
          participants: {
            $addToSet: {
              phone: '$from',
              name: '$contactName'
            }
          },
          lastUpdated: { $max: '$lastUpdated' }
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          messages: 1,
          participants: {
            $filter: {
              input: '$participants',
              as: 'participant',
              cond: { $ne: ['$$participant.phone', null] }
            }
          },
          lastUpdated: 1
        }
      },
      {
        $sort: { lastUpdated: -1 } // Sort conversations by most recent
      }
    ]).toArray();

    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}

export async function getConversationById(req: Request, res: Response) {
  try {
    const conversationId = req.params.id;
    const db = getDb();
    const messagesCollection = db.collection<ProcessedMessage>('processed_messages');

    const conversation = await messagesCollection.aggregate([
      {
        $match: { conversationId }
      },
      {
        $sort: { timestamp: 1 }
      },
      {
        $group: {
          _id: '$conversationId',
          messages: {
            $push: {
              id: '$messageId',
              body: '$body',
              from: '$from',
              to: '$to',
              timestamp: '$timestamp',
              status: '$status',
              type: '$type'
            }
          },
          participants: {
            $addToSet: {
              phone: '$from',
              name: '$contactName'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          messages: 1,
          participants: {
            $filter: {
              input: '$participants',
              as: 'participant',
              cond: { $ne: ['$$participant.phone', null] }
            }
          }
        }
      }
    ]).next();

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
}