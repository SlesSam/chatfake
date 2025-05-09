'use client';

import { Message } from '@/types/message';
import EmptyChat from './chatEmpty';
import { useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, RefreshCw, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

type Props = {
  messages: Message[];
  isLoading?: boolean;
  hasPendingReply?: boolean;
};

export default function ChatMessages({ messages, isLoading, hasPendingReply }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, hasPendingReply]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-2">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        <>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`group px-4 py-4 rounded-2xl text-base shadow-sm transition-all duration-300 ${msg.sender === 'ai'
                ? 'ml-auto mr-5 bg-indigo-50 text-left text-indigo-900 max-w-2xl'
                : 'mr-auto bg-gray-100 text-left text-gray-800 max-w-[75%]'
                }`}
            >
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed">
                  {line}
                </p>
              ))}

              {msg.sender === 'ai' && (
                <div className="mt-4 flex justify-center gap-4 text-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    title="Copiar"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(msg.text);
                        toast.success('¡Texto copiado!');
                      } catch (err) {
                        console.error('Error al copiar:', err);
                        toast.error('Error al copiar');
                      }
                    }}
                    className="hover:text-indigo-500 transition"
                  >
                    <Copy size={18} />
                  </button>
                  <button title="Me gusta" className="hover:text-green-500 transition">
                    <ThumbsUp size={18} />
                  </button>
                  <button title="No me gusta" className="hover:text-red-500 transition">
                    <ThumbsDown size={18} />
                  </button>
                  <button title="Regenerar" className="hover:text-blue-500 transition">
                    <RefreshCw size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (

            <div className="mx-auto flex items-center gap-2 text-indigo-700 animate-pulse">
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Cargando respuesta...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </>
      )}

    </div>
  );
}
