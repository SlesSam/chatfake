export default function ChatInput() {
    return (
        <footer className="p-4 border-t bg-white">
            <form className="flex gap-2">
                <input
                    type="text"
                    placeholder="What's in your mind?..."
                    className="flex-1 p-3 border rounded-full bg-gray-100 focus:outline-none"
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
