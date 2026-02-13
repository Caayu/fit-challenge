import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchBookById } from '../../../actions/fetch-books'

type PageProps = {
  params: Promise<{ id: string }>
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params
  const book = await fetchBookById(Number(id))

  if (!book?.id) notFound()

  return (
    <div className="min-h-screen bg-[#F0F0F0] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-lg font-medium hover:opacity-70 transition-opacity"
          >
            <span className="text-2xl leading-none">&#8249;</span> Voltar
          </Link>

          <div className="flex items-center gap-6">
            <button className="text-lg font-medium cursor-pointer hover:opacity-70 transition-opacity">
              Editar
            </button>
            <button className="text-lg font-medium text-red-600 cursor-pointer hover:opacity-70 transition-opacity">
              Excluir
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-[40px] font-semibold leading-tight text-[#111111]">
              {book.title}
            </h1>

            <div className="flex items-center justify-between text-[20px] font-medium text-[#111111]">
              <span>Por {book.author}</span>
              <span>Publicado em {formatDate(book.publicationDate)}</span>
            </div>

            <p className="text-[16px] font-normal text-[#111111] text-justify leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>

          <div className="shrink-0">
            <Image
              src={book.image}
              alt={book.title}
              width={280}
              height={420}
              className="w-[280px] h-auto object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  )
}
