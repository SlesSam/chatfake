'use client';
import { useState } from 'react';

type Props = {
    onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: Props) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);          // 🔁 Envía el mensaje al padre
        setText('');              // 🧽 Limpia el input
    };

    return (
        <footer >
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    placeholder="What's in your mind?..."
                    className="flex-1 p-3 border rounded-full bg-gray-100 focus:outline-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full"
                >
                    ➤
                </button>
            </form>
        </footer>
    );
}
