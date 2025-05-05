import ChatInput from "@/components/chats/chatInput";
import ChatMessages from "@/components/chats/chatMessages";

export default function ChatPage() {
    return (

        <main className="chat-card ">

            <section className="flex-1 flex flex-col bg-[#f7f9fc]">
                <ChatMessages/>
                <ChatInput />
            </section>
        </main>
    );

}
