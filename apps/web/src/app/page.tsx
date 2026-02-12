import { Suspense } from 'react'
import { BookCard } from '../components/book-card'
import { SearchInput } from '../components/search-input'
import type { BooksResponse } from '../types/book'

const API_URL = process.env.API_URL ?? 'http://localhost:3001'

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

async function getBooks(search?: string): Promise<BooksResponse> {
  const params = new URLSearchParams({ page: '1', limit: '10' })
  if (search) params.set('search', search)

  const res = await fetch(`${API_URL}/api/books?${params}`, {
    cache: 'no-store'
  })

  return res.json()
}

export default async function Home({ searchParams }: PageProps) {
  const { q } = await searchParams
  const { data: books } = await getBooks(q)

  return (
    <div className="min-h-screen bg-[#F0F0F0] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">Livros</h1>
          <button className="text-xl md:text-2xl font-medium cursor-pointer">
            Novo
          </button>
        </header>

        <Suspense>
          <SearchInput />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              description={book.description}
              image={book.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
