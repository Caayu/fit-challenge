import { Suspense } from 'react'
import { BookList } from '../components/book-list'
import { SearchInput } from '../components/search-input'
import { API_URL } from '../config/env'
import type { BooksResponse } from '../types/book'

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

async function getBooks(search?: string): Promise<BooksResponse> {
  const params = new URLSearchParams({ page: '1', limit: '10' })
  if (search) params.set('search', search)

  const res = await fetch(`${API_URL}/api/books?${params}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        lastPage: 1,
        previousPage: null,
        nextPage: null
      }
    }
  }

  return res.json()
}

export default async function Home({ searchParams }: PageProps) {
  const { q } = await searchParams
  const data = await getBooks(q)

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

        <BookList initialData={data} search={q} />
      </div>
    </div>
  )
}
