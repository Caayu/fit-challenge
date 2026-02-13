import { Suspense } from 'react'
import { fetchBooks } from '../actions/fetch-books'
import { BookList } from '../components/book-list'
import { NewBookButton } from '../components/new-book-button'
import { SearchInput } from '../components/search-input'

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const { q } = await searchParams
  const data = await fetchBooks(1, 10, q)

  return (
    <div className="min-h-screen bg-[#F0F0F0] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">Livros</h1>
          <NewBookButton />
        </header>

        <Suspense>
          <SearchInput />
        </Suspense>

        <BookList initialData={data} search={q} />
      </div>
    </div>
  )
}
