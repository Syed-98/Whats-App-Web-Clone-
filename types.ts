
export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isSender: boolean;
  status: MessageStatus;
}

export interface User {
  id: string; // wa_id
  name: string;
  avatar: string;
  phoneNumber: string;
}

export interface Chat {
  user: User;
  messages: Message[];
  unreadCount: number;
}
