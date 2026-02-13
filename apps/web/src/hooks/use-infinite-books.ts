'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchBooks } from '../actions/fetch-books'
import type { BooksResponse } from '../types/book'

export function useInfiniteBooks(initialData: BooksResponse, search?: string) {
  const [books, setBooks] = useState(initialData.data)
  const [meta, setMeta] = useState(initialData.meta)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBooks(initialData.data)
    setMeta(initialData.meta)
  }, [initialData])

  const loadMore = async () => {
    if (loading || !meta.nextPage) return
    setLoading(true)

    try {
      const data = await fetchBooks(meta.nextPage, 10, search)

      setBooks((prev) => [...prev, ...data.data])
      setMeta(data.meta)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const el = observerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore()
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [meta.nextPage, search])

  return { books, meta, loading, observerRef }
}
