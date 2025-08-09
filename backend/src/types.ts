export interface WhatsAppContact {
  profile: { name: string };
  wa_id: string;
}

export interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  type?: string;
}

export interface WhatsAppStatus {
  id: string;
  recipient_id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
}

export interface WhatsAppChange {
  field: string;
  value: {
    messaging_product: string;
    metadata: {
      display_phone_number: string;
      phone_number_id: string;
    };
    contacts?: WhatsAppContact[];
    messages?: WhatsAppMessage[];
    statuses?: WhatsAppStatus[];
  };
}

export interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

export interface WhatsAppMetadata {
  entry: WhatsAppEntry[];
  gs_app_id: string;
  object: string;
  startedAt?: string;
  completedAt?: string;
}

export interface RawPayload {
  payload_type: string;
  _id: string;
  metaData: WhatsAppMetadata;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  executed: boolean;
}

export interface ProcessedMessage {
  messageId: string;
  conversationId: string;
  body: string;
  from: string;
  to: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'received';
  type?: string;
  contactName?: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  appId: string;
  lastUpdated: Date;
}