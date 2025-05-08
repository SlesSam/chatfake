'use client';
import { useState } from 'react';

type Props = {
    onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: Props) {
    const [text, setText] = useState('');

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText('');
      };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };

    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }} className="w-full px-4 py-5 bg-white border-t flex items-end">
            <div  className="flex w-full max-w-4xl mx-auto items-center gap-2">
                <textarea
                    rows={1}
                    maxLength={500}
                    onKeyDown={handleKeyDown}
                    placeholder="What's in your mind?..."
                    className="w-full resize-none max-h-40 min-h-[48px] overflow-y-auto rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="justify-center bg-indigo-500 text-white rounded-full p-3 hover:bg-indigo-700 disabled:opacity-50"
                    disabled={!text.trim()}
                    title="Enviar"
                >
                    ➤
                </button>
            </div>
        </form>

    );
}
