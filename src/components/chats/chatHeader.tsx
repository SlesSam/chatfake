'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function ChatHeader() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };


  return (
    <header className="p-4 border-b bg-white flex items-center justify-between">
      <h2 className="font-semibold text-lg">Hola, {userName} 👋</h2>
      <button onClick={handleLogout}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">Cerrar session</button>
    </header>
  );
}
