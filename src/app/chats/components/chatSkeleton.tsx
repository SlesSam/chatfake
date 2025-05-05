import ChatSidebar from "@/components/chats/chatSidebar";

import ChatHeader from "@/components/chats/chatHeader";
import ChatInput from "@/components/chats/chatInput";
import ChatMessages from "@/components/chats/chatMessages";

export default function ChatSkeleton() {
  return (
    <main className="flex h-screen">
      <ChatSidebar />
      <section className="flex-1 flex flex-col bg-[#f7f9fc]">
        <ChatHeader />
         <ChatMessages/>
        <ChatInput />
      </section>
    </main>
  );
}
