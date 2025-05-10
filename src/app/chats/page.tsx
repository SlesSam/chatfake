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

  const userChats = allChats.filter((chat: Chat) => chat.userId === user.id);

  if (userChats.length > 0) {
    // Si ya tiene chats previos, lo llevamos al último chat
    router.push(`/chats/${userChats[0].id}`);
    return;
  }

  // Si no tiene chats aún, creamos uno nuevo
  const newChat = {
    id: Date.now().toString(),
    userId: user.id,
    title: 'Nuevo chat',
    lastMessage: 'Empieza a chatear...',
  };

  const updatedChats = [newChat, ...allChats];
  localStorage.setItem('chats', JSON.stringify(updatedChats));

  router.push(`/chats/${newChat.id}`);
}, []);
 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Cargando...</h1>
      <p className="mt-4 text-gray-500">Redirigiendo a tu chat...</p>
    </div>
  );
} 
