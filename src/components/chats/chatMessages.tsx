'use client';

import { useEffect, useState } from 'react';
import messageData from '@/data/message.json';
import { Message } from '@/types/message';
import { useParams } from 'next/navigation';
import EmptyChat from './chatEmpty';



export default function ChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams();

  useEffect(() => {
    const chatId = params.id as string;
    const chat = messageData.find((c) => c.chatId === chatId);
    setMessages(
      chat?.messages.map((msg) => ({
        ...msg,
        sender: msg.sender as 'user' | 'ai',
      })) || []
    );
  }, [params.id]);

  return (
    <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}
          >
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
}
