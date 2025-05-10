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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="w-full px-4 py-5 bg-white border-t flex items-end"
    >
      <div className="flex w-full max-w-4xl mx-auto items-center gap-2">
        <textarea
          rows={1}
          maxLength={500}
          onKeyDown={handleKeyDown}
          placeholder="What's in your mind?..."
          className="w-full resize-none max-h-40 min-h-[48px] overflow-y-auto rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all"

          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 transition text-white rounded-full w-11 h-11 flex items-center justify-center shadow-md"
          disabled={!text.trim()}
          title="Enviar"
        >
          <span className="text-lg">➤</span>

        </button>
      </div>
    </form>
  );
}
