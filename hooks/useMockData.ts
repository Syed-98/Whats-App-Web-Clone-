
import { useState, useCallback, useEffect } from 'react';
import { Chat, Message, User, MessageStatus } from '../types';

const API_URL = 'http://localhost:4000/api/conversations';
const MY_PHONE_NUMBER = "918329446654";

export const useMockData = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const processConversations = useCallback((conversations: any[]): Chat[] => {
    return conversations.map(conversation => {
      const otherParticipant = conversation.participants.find(
        (p: any) => p.phone !== MY_PHONE_NUMBER
      );

      const messages: Message[] = conversation.messages.map((msg: any) => ({
        id: msg.id,
        text: msg.body,
        timestamp: new Date(msg.timestamp).getTime(),
        isSender: msg.from === MY_PHONE_NUMBER,
        status: msg.status as MessageStatus || (
          msg.from === MY_PHONE_NUMBER ? MessageStatus.SENT : MessageStatus.DELIVERED
        ),
      }));

      const unreadCount = messages.filter(
        m => !m.isSender && m.status !== MessageStatus.READ
      ).length;

      return {
        user: {
          id: otherParticipant?.phone || conversation.id,
          name: otherParticipant?.name || 'Unknown',
          avatar: `https://i.pravatar.cc/150?u=${otherParticipant?.phone || conversation.id}`,
          phoneNumber: otherParticipant?.phone || 'Unknown',
        },
        messages,
        unreadCount,
      };
    }).sort((a, b) => {
      const lastA = a.messages[a.messages.length - 1]?.timestamp || 0;
      const lastB = b.messages[b.messages.length - 1]?.timestamp || 0;
      return lastB - lastA;
    });
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const processedChats = processConversations(data);
      setChats(processedChats);
      setError(null);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations');
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  }, [processConversations]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const getChatById = useCallback((chatId: string) => {
    return chats.find(chat => chat.user.id === chatId) || null;
  }, [chats]);

  const sendMessage = useCallback((chatId: string, text: string) => {
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      text,
      timestamp: Date.now(),
      isSender: true,
      status: MessageStatus.SENT,
    };

    setChats(prevChats => {
      const newChats = prevChats.map(chat => {
        if (chat.user.id === chatId) {
          return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
      }).sort((a, b) => {
        const lastA = a.messages[a.messages.length - 1];
        const lastB = b.messages[b.messages.length - 1];
        if (!lastA) return 1;
        if (!lastB) return -1;
        return lastB.timestamp - lastA.timestamp;
      });
      return newChats;
    });

    setTimeout(() => {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.user.id === chatId) {
          const updatedMessages = chat.messages.map(m =>
            m.id === newMessage.id ? { ...m, status: MessageStatus.DELIVERED } : m
          );
          return { ...chat, messages: updatedMessages };
        }
        return chat;
      }));
    }, 1000);
  }, []);

  const markAsRead = useCallback((chatId: string) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.user.id === chatId && chat.unreadCount > 0) {
        const updatedMessages = chat.messages.map(m =>
          (!m.isSender && m.status !== MessageStatus.READ)
            ? { ...m, status: MessageStatus.READ }
            : m
        );
        return { ...chat, unreadCount: 0, messages: updatedMessages };
      }
      return chat;
    }));
  }, []);

  const refresh = useCallback(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    chats,
    getChatById,
    sendMessage,
    markAsRead,
    isLoading,
    error,
    refresh,
  };
};
