'use client';

import { useEffect, useState } from 'react';
import ChatInput from '@/components/chats/chatInput';
import ChatMessages from '@/components/chats/chatMessages';
import { Message } from '@/types/message';

import { useParams } from 'next/navigation';

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPendingReply, setHasPendingReply] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('messages');
    const all: Message[] = stored ? JSON.parse(stored) : [];
    const filtered = all.filter((m) => m.chatId === id);
    setMessages(filtered);
  }, [id]);

  const handleSend = async (text: string) => {
    const timestamp = new Date().toISOString();
    const userMessage: Message = {
      id: Date.now().toString(),
      chatId: id as string,
      sender: 'user',
      text,
      timestamp,
    };

    const aiMessage: Message = {
      id: Date.now().toString() + '-ai',
      chatId: id as string,
      sender: 'ai',
      text: 'Lo siento, no pude responder.', // por defecto
      timestamp: new Date().toISOString(),
    };

    setHasPendingReply(true);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      aiMessage.text = data.reply;
    } catch (err) {
      console.error('Error con la IA:', err);
    }

    const newMessages = [...messages, userMessage, aiMessage];
    setMessages(newMessages);
    setIsLoading(false);
    setHasPendingReply(false);

    if (id) {
      if (typeof id === 'string') {
        localStorage.setItem('messages', JSON.stringify(newMessages.concat(getOtherMessages(id))));
      } else {
        console.error('Chat ID is not a valid string.');
      }
    } else {
      console.error('Chat ID is undefined.');
    }


    const storedChats = localStorage.getItem('chats');
    const allChats = storedChats ? JSON.parse(storedChats) : [];

    let updatedChats = allChats.map(
      (c: { id: string; title: string; lastMessage: string; updatedAt: string }) =>
        c.id === id
          ? {
            ...c,
            title: c.title === 'Nuevo chat' ? text : c.title,
            lastMessage: aiMessage.text,
            updatedAt: timestamp,
          }
          : c
    );

    const movedChat = updatedChats.find(
      (c: { id: string; title: string; lastMessage: string; updatedAt: string }) => c.id === id
    );
    updatedChats = [
      movedChat!,
      ...updatedChats.filter(
        (c: { id: string; title: string; lastMessage: string; updatedAt: string }) => c.id !== id
      ),
    ];
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    const event = new CustomEvent('refreshChats');
    window.dispatchEvent(event);
  };

  const getOtherMessages = (currentId: string) => {
    const stored = localStorage.getItem('messages');
    const all: Message[] = stored ? JSON.parse(stored) : [];
    return all.filter((m) => m.chatId !== currentId);
  };

  return (
    <main>
      <section className="flex flex-col h-full">
        <ChatMessages messages={messages} isLoading={isLoading} hasPendingReply={hasPendingReply} />

        <ChatInput onSend={handleSend} />
      </section>
    </main>
  );
}
