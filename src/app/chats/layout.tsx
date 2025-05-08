import ChatHeader from '@/components/chats/chatHeader';
import ChatSidebar from '@/components/chats/chatSidebar';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen ">
      <ChatSidebar />
      <section className="flex-1 flex flex-col bg-[#f7f9fc] overflow-hidden">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </section>
    </main>
  );
}
