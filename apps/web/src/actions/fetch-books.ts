'use server'

import { API_URL } from '../config/env'
import type { BooksResponse } from '../types/book'

export async function fetchBooks(
  page: number,
  limit: number,
  search?: string
): Promise<BooksResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })
  if (search) params.set('search', search)

  const res = await fetch(`${API_URL}/api/books?${params}`, {
    cache: 'no-store'
  })

  return res.json()
}
