'use client';

import ChatInput from "@/components/chats/chatInput";
import ChatMessages from "@/components/chats/chatMessages";




export default function ChatDetailPage() {
    return <main className="flex h-screen">
       
        <section className="flex-1 flex flex-col bg-[#f7f9fc]">
            <ChatMessages></ChatMessages>
            <ChatInput />
        </section>
    </main>
}
