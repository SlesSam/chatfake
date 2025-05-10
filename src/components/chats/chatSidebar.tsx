'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatList from './chatList';
import { Bot, Settings } from 'lucide-react';
import Image from 'next/image';
import UserDetails from '../user/userDetails';

export default function ChatSidebar() {
  const [user, setUser] = useState<{ id: string; name: string; photo?: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // para forzar refresco
  const router = useRouter();
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/');
    } else {
      setUser(JSON.parse(stored));
    }

    const handleRefresh = () => setRefreshKey((prev) => prev + 1);
    window.addEventListener('refreshChats', handleRefresh);
    return () => window.removeEventListener('refreshChats', handleRefresh);
  }, []);

  const handleNewChat = () => {
    if (!user) return;

    const newChat = {
      id: Date.now().toString(),
      userId: user.id,
      title: 'Nuevo chat',
      lastMessage: 'Empieza a chatear...',
    };

    const stored = localStorage.getItem('chats');
    const chats = stored ? JSON.parse(stored) : [];
    chats.unshift(newChat);
    localStorage.setItem('chats', JSON.stringify(chats));

    setRefreshKey((prev) => prev + 1);
    router.push(`/chats/${newChat.id}`);
  };

  return (
    <aside className="w-[300px] bg-white border-r flex flex-col h-screen overflow-x-hidden">
      <div className="flex items-center justify-center py-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Bot className="text-indigo-600" />
          <span className="text-gray-800">
            Chat <span className="text-indigo-600">A.I+</span>
          </span>
        </h1>
      </div>

      <div className="px-4 py-2">
        <button
          onClick={handleNewChat}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          + New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 text-sm">
        {user && <ChatList userId={user.id} key={refreshKey} />}
      </div>

      <div className="shrink-0 px-4 py-4 border-t flex flex-col gap-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition text-sm text-gray-700">
          <Settings className="w-4 h-4" />
          Settings
        </button>

        <button
          onClick={() => setShowUserDetails(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition text-sm text-gray-800 w-full text-left"
        >
          {user?.photo ? (
            <Image
              src={user.photo}
              alt="Foto de perfil"
              className="w-6 h-6 rounded-full object-cover"
              width={24}
              height={24}
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold uppercase text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
          <span className="truncate">{user?.name || 'Tu perfil'}</span>
        </button>

      </div>
      <UserDetails isOpen={showUserDetails} onClose={() => setShowUserDetails(false)} />
    </aside>
  );
}
