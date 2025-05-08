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
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm z-10">
      <h2 className="text-xl font-semibold text-gray-800">Hola, {userName} 👋</h2>
      <button onClick={handleLogout}
        className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-full text-sm font-medium">Cerrar session</button>
    </header>
  );
}
