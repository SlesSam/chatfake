'use client';

import ChatInput from "@/components/chats/chatInput";
import ChatMessages from "@/components/chats/chatMessages";


// addMessage = (message) => {
//     // Aquí puedes agregar la lógica para enviar el mensaje al servidor o a la API
//     console.log("Mensaje enviado:", message);
// }


export default function ChatDetailPage() {
    return <main className="flex h-screen">
       
        <section className="flex-1 flex flex-col bg-[#f7f9fc]">
            <ChatMessages></ChatMessages>
            <ChatInput onSend={(text) => console.log("Message sent:", text)} />
        </section>
    </main>
}
