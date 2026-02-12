'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
        if (entries[0]?.isIntersecting) void loadMore()
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  return { books, meta, loading, observerRef }
}
