'use server'

import { API_URL } from '@/lib/env'
import type { Book, BooksResponse } from './types'

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

type BookInput = {
  title: string
  author: string
  publicationDate: string
  description: string
  image: string
}

export async function createBook(input: BookInput): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  })

  if (!res.ok) {
    throw new Error('Failed to create book')
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return {} as Book
  }

  return res.json()
}

export async function updateBook(
  id: number,
  input: Partial<BookInput>
): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  })

  if (!res.ok) {
    throw new Error('Failed to update book')
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return {} as Book
  }

  return res.json()
}

export async function uploadImage(formData: FormData): Promise<string> {
  const res = await fetch(`${API_URL}/api/upload/image`, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  if (data.url && data.url.startsWith('http')) {
    try {
      const parsed = new URL(data.url)
      return parsed.pathname + parsed.search
    } catch {
      return data.url
    }
  }

  return data.url
}
