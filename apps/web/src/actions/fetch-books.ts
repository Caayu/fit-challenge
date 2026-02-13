'use server'

import { API_URL } from '../config/env'
import type { Book, BooksResponse } from '../types/book'

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

export async function fetchBookById(id: number): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    cache: 'no-store'
  })

  return res.json()
}
