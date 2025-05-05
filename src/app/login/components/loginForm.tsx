'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import rawUsers from '@/data/data.json';
import { User } from '@/types/user';

// Forzamos a TypeScript a saber que esto es un array de User
const users = rawUsers as User[];

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/chats');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-gray-100 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px] space-y-6">
        {/* Logo y título */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">Welcom to ChatAI</h1>
          <p className="text-gray-700 mt-2">Welcome back! Please enter your email and password to enter the application.</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-500">
          <a href="#" className="hover:text-indigo-600">Forgot password?</a>
          <a href="#" className="hover:text-indigo-600">Register</a>
        </div>

        {/* Divider */}
        
       
      </div>
    </div>
  );
}