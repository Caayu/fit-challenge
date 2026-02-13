import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#F0F0F0] text-center">
      <h1 className="text-9xl font-extrabold text-[#333]">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-[#555]">
        Página não encontrada
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[#333] px-6 py-3 text-white transition hover:bg-black"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
