'use client';

import { useState } from 'react';
import ChatInput from "@/components/chats/chatInput";
import ChatMessages from "@/components/chats/chatMessages";
import { Message } from "@/types/message";

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
  
    const handleSend = (text: string) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    };
  
    return (
      <main className="chat-card">
        <section className="flex-1 flex flex-col bg-[#f7f9fc]">
          <ChatMessages />
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p><strong>{message.sender}:</strong> {message.text}</p>
              <span className="timestamp">{new Date(message.timestamp).toLocaleString()}</span>
            </div>
          ))}
          <ChatInput onSend={handleSend} />
        </section>
      </main>
    );
  }
