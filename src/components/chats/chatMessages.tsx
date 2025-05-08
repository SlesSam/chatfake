'use client';

import { Message } from '@/types/message';
import EmptyChat from './chatEmpty';
import { useEffect, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';

type Props = {
  messages: Message[];
};

export default function ChatMessages({ messages }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70ch] break-words px-4 py-2 rounded-2xl text-sm shadow-md ${
              msg.sender === 'ai'
                ? 'ml-auto bg-indigo-100 text-right text-indigo-900'
                : 'mr-auto bg-gray-100 text-left text-gray-800'
            }`}
          >
            {msg.text.split('\n').map((line, idx) => (
              <p key={idx} className="mb-2">
                {line}
              </p>
            ))}
            {/* <ReactMarkdown>{msg.text}</ReactMarkdown> */}
          </div>
        ))
      )}
    </div>
  );
}
