'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
import { Message } from '@/types/message';
import EmptyChat from './chatEmpty';
import { useEffect, useRef } from 'react';

type Props = {
  messages: Message[];
};

export default function ChatMessages({ messages }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Auto scroll al fondo cuando llegan nuevos mensajes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef}
    className="flex flex-col gap-4 p-4 overflow-y-auto flex-1 bg-[#f7f9fc] max-h-[calc(100vh-180px)]">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-[80%] break-words px-4 py-2 rounded-2xl text-sm shadow-md ${
              msg.sender === 'ai'
                ? 'ml-auto bg-indigo-100 text-right text-indigo-900'
                : 'mr-auto bg-gray-100 text-left text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
}
