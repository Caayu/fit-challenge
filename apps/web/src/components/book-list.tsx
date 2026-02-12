'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Book, BooksResponse } from '../types/book'
import { BookCard } from './book-card'

type BookListProps = {
  initialBooks: Book[]
  initialMeta: BooksResponse['meta']
  search?: string
}

export function BookList({ initialBooks, initialMeta, search }: BookListProps) {
  const [books, setBooks] = useState(initialBooks)
  const [meta, setMeta] = useState(initialMeta)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBooks(initialBooks)
    setMeta(initialMeta)
  }, [initialBooks, initialMeta])

  const loadMore = useCallback(async () => {
    if (loading || !meta.nextPage) return
    setLoading(true)

    const params = new URLSearchParams({
      page: String(meta.nextPage),
      limit: '10'
    })
    if (search) params.set('search', search)

    const res = await fetch(`/api/proxy/books?${params}`)
    const data: BooksResponse = await res.json()

    setBooks((prev) => [...prev, ...data.data])
    setMeta(data.meta)
    setLoading(false)
  }, [loading, meta.nextPage, search])

  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <>
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
