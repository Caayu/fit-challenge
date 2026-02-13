'use server'

import { revalidatePath } from 'next/cache'

import { API_URL } from '@/lib/env'
import type { Book, BooksResponse } from './types'

export type ActionState<T> = {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string[]>
}

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

  const res = await fetch(`${API_URL}/api/books?${params}`)

  return res.json()
}

export async function fetchBookById(id: number): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books/${id}`)

  return res.json()
}

type BookInput = {
  title: string
  author: string
  publicationDate: string
  description: string
  image: string
}

export async function createBook(input: BookInput): Promise<ActionState<Book>> {
  try {
    const res = await fetch(`${API_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })

    if (!res.ok) {
      if (res.status === 409) {
        return {
          success: false,
          error: 'Já existe um livro cadastrado com este título e autor.'
        }
      }

      try {
        const errorData = await res.json()
        return {
          success: false,
          error: errorData.message || 'Falha ao criar o livro.'
        }
      } catch {
        return { success: false, error: 'Falha ao criar o livro.' }
      }
    }

    let data: Book = {} as Book
    if (res.status !== 204 && res.headers.get('content-length') !== '0') {
      data = await res.json()
    }

    revalidatePath('/')
    return { success: true, data }
  } catch {
    return { success: false, error: 'Erro de conexão. Verifique sua internet.' }
  }
}

export async function updateBook(
  id: number,
  input: Partial<BookInput>
): Promise<ActionState<Book>> {
  try {
    const res = await fetch(`${API_URL}/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })

    if (!res.ok) {
      if (res.status === 409) {
        return {
          success: false,
          error: 'Já existe um livro cadastrado com este título e autor.'
        }
      }

      try {
        const errorData = await res.json()
        return {
          success: false,
          error: errorData.message || 'Falha ao atualizar o livro.'
        }
      } catch {
        return { success: false, error: 'Falha ao atualizar o livro.' }
      }
    }

    let data: Book = {} as Book
    if (res.status !== 204 && res.headers.get('content-length') !== '0') {
      data = await res.json()
    }

    revalidatePath('/')
    revalidatePath(`/books/${id}`)
    return { success: true, data }
  } catch {
    return { success: false, error: 'Erro de conexão. Verifique sua internet.' }
  }
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

export async function deleteBook(id: number): Promise<ActionState<void>> {
  try {
    const res = await fetch(`${API_URL}/api/books/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      return { success: false, error: 'Falha ao excluir o livro.' }
    }

    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Erro de conexão. Verifique sua internet.' }
  }
}
