'use client';

import { Chat } from '@/types/chat';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Props {
  userId: string;
}

export default function ChatList({ userId }: Props) {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('chats');
    const localChats = stored ? (JSON.parse(stored) as Chat[]) : [];

  
    const combined = [...localChats];

    const filtered = combined.filter((chat) => chat.userId === userId);
    setUserChats(filtered);
  }, [userId]);

  const currentChatId = pathname.split('/chats/')[1];

  const handleDelete = (id: string) => {
    const updated = userChats.filter((chat) => chat.id !== id);
    setUserChats(updated);

    // Actualizar también localStorage
    const stored = localStorage.getItem('chats');
    const localChats = stored ? (JSON.parse(stored) as Chat[]) : [];
    const newStorage = localChats.filter((c) => c.id !== id);
    localStorage.setItem('chats', JSON.stringify(newStorage));
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleEditSave = (id: string) => {
    const updated = userChats.map((chat) =>
      chat.id === id ? { ...chat, title: editTitle } : chat
    );
    setUserChats(updated);
    setEditingId(null);

    // Actualizar localStorage también
    const stored = localStorage.getItem('chats');
    const localChats = stored ? (JSON.parse(stored) as Chat[]) : [];
    const updatedStorage = localChats.map((chat) =>
      chat.id === id ? { ...chat, title: editTitle } : chat
    );
    localStorage.setItem('chats', JSON.stringify(updatedStorage));
  };

  const yourChats = userChats.slice(0, 4);
  const last7Days = userChats.slice(4);

  const renderChatItem = (chat: Chat) => {
    const isActive = chat.id === currentChatId;

    return (
      <div
        key={chat.id}
        className={`p-3 rounded-md shadow-sm group transition cursor-pointer ${
          isActive ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1 min-w-0" onClick={() => router.push(`/chats/${chat.id}`)}>
            {editingId === chat.id ? (
              <input
                className="text-sm border-b border-gray-300 bg-white text-gray-800 focus:outline-none"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleEditSave(chat.id)}
                autoFocus
              />
            ) : (
              <h3
                className={`font-semibold text-sm truncate ${isActive ? 'text-white' : 'text-gray-900'}`}
              >
                {chat.title}
              </h3>
            )}
            <p className={`text-xs truncate ${isActive ? 'text-indigo-200' : 'text-gray-600'}`}>
              {chat.lastMessage}
            </p>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
            <button aria-label="Editar" onClick={() => handleEdit(chat.id, chat.title)}>
              <FiEdit2
                className={
                  isActive
                    ? 'text-white hover:text-indigo-300'
                    : 'text-gray-500 hover:text-indigo-600'
                }
              />
            </button>
            <button onClick={() => handleDelete(chat.id)}>
              <FiTrash2
                className={
                  isActive ? 'text-white hover:text-red-300' : 'text-gray-500 hover:text-red-600'
                }
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 py-4 px-2">
      {userChats.length === 0 ? (
        <p className="text-gray-500 italic text-sm">No hay chats disponibles</p>
      ) : (
        <>
          <div>
            <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Your conversations
            </h2>
            <div className="flex flex-col gap-2">{yourChats.map(renderChatItem)}</div>
          </div>

          {last7Days.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Last 7 Days
              </h2>
              <div className="flex flex-col gap-2">{last7Days.map(renderChatItem)}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
