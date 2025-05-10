'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function UserDetails({ isOpen, onClose }: Props) {

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

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                    title="Cerrar"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4">Perfil de usuario</h2>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium"> {userName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium"> {}</p>
                    </div>
                    <button  onClick={handleLogout} className="mt-6 bg-red-100 text-red-600 w-full py-2 rounded-xl hover:bg-red-200 transition">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}