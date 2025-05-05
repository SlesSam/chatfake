import EmptyChat from "@/components/chats/chatEmpty";
import ChatInput from "@/components/chats/chatInput";



export default function ChatPage() {


  return (
    <main className="chat-card">
      <EmptyChat />
      <ChatInput onSend={function (text: string): void {
              throw new Error("Function not implemented.");
          } } />
    </main>
  );
}
