'use server'

import { API_URL } from '../config/env'
import type { Book } from '../types/book'

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

  return res.json()
}
