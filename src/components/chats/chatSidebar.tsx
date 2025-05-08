'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatList from './chatList';
import { Bot, Settings } from 'lucide-react';
import Image from 'next/image';

export default function ChatSidebar() {
  const [user, setUser] = useState<{ id: string; name: string; photo?: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // 👈 para forzar refresco
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/');
    } else {
      setUser(JSON.parse(stored));
    }
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

    setRefreshKey(prev => prev + 1); // 🔁 forzar refresco del ChatList
    router.push(`/chats/${newChat.id}`);
  };

  return (
    <aside className="w-[300px] bg-white border-r p-4">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Bot className="text-indigo-600" />
            Chat <span className="text-indigo-600">A.I+</span>
          </h1>

          <button
            onClick={handleNewChat}
            className="bg-indigo-600 text-white w-full py-2 rounded-lg mb-4"
          >
            + New chat
          </button>

          <div className="space-y-2 text-gray-700 text-sm overflow-y-auto max-h-[calc(100vh-250px)]">
            {user && <ChatList userId={user.id} key={refreshKey} />}
          </div>
        </div>
        <div className="pt-6 border-t flex flex-col gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition text-sm">
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition text-sm">
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
            <span>{user?.name || 'Tu perfil'}</span>
          </div>
        </div>

      </div>
    </aside>

  );
}
