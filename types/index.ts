export interface Contact {
  id: string;
  name: string;
  color: string;
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: number;
  isFromMe: boolean;
}