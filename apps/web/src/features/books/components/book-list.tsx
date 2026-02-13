'use client'

import { BookCard } from '@/features/books/components/book-card'
import { useInfiniteBooks } from '@/features/books/hooks/use-infinite-books'
import type { BooksResponse } from '@/features/books/types'

type BookListProps = {
  initialData: BooksResponse
  search?: string
}

export function BookList({ initialData, search }: BookListProps) {
  const { books, meta, loading, observerRef } = useInfiniteBooks(
    initialData,
    search
  )

  return (
    <>
      {books.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          Nenhum livro encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
              image={book.image}
            />
          ))}
        </div>
      )}

      {meta.nextPage && (
        <div ref={observerRef} className="flex justify-center py-8">
          {loading && (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
          )}
        </div>
      )}
    </>
  )
}
