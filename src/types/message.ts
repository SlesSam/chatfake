export interface Message {
  id: string;
  chatId?: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
