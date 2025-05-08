'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import rawUsers from '@/data/user.json';
import { User } from '@/types/user';
import { Eye, EyeOff } from 'lucide-react'; // 👈 Instala lucide-react si no lo tienes

const users = rawUsers as User[];

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ control
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">Welcome to ChatAI</h1>
          <p className="text-gray-700 mt-2">Please enter your email and password to log in.</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border  text-gray-800 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 border  text-gray-800 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-500">
          <a href="#" className="hover:text-indigo-600">
            Forgot password?
          </a>
          <a href="#" className="hover:text-indigo-600">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
