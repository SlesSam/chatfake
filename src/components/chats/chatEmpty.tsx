export default function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 px-6">
      <h2 className="text-2xl font-semibold mb-4">¿En qué puedo ayudarte?</h2>
      <p className="mb-4">Haz una pregunta o elige una sugerencia para comenzar.</p>
      <div className="flex gap-2 flex-wrap justify-center">
        <button className="px-4 py-2 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
          Buscar
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
          Investigación
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
          Crea una imagen
        </button>
      </div>
    </div>
  );
}
