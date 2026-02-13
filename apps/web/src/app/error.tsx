'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center px-6">
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Algo deu errado</h2>
        <p className="text-gray-500">
          Não foi possível carregar os livros. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
