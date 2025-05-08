'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
import { Message } from '@/types/message';
import EmptyChat from './chatEmpty';

type Props = {
  messages: Message[];
};

export default function ChatMessages({ messages }: Props) {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const { id } = useParams();

  // useEffect(() => {
  //   const stored = localStorage.getItem('messages');
  //   if (stored) {
  //     const all: Message[] = JSON.parse(stored);
  //     const filtered = all.filter(m => m.chatId === id);
  //     setMessages(filtered);
  //   }
  // }, [id]);

  return (
    <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        messages.map(msg => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
          >
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
}
