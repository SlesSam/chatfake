'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Chat } from '@/types/chat';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    const stored = localStorage.getItem('chats');
    const allChats = stored ? JSON.parse(stored) : [];

    const cleanedChats = allChats.filter(
      (chat: Chat) => !(chat.userId === user.id && chat.title === 'Nuevo chat')
    );

    const newChat = {
      id: Date.now().toString(),
      userId: user.id,
      title: 'Nuevo chat',
      lastMessage: 'Empieza a chatear...',
    };

    const updatedChats = [newChat, ...cleanedChats];
    localStorage.setItem('chats', JSON.stringify(updatedChats));

    router.push(`/chats/${newChat.id}`);
  }, []);

  return null;
}
