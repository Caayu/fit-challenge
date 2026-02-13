'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { deleteBook, updateBook } from '@/features/books/actions'
import { BookModal } from '@/features/books/components/book-modal'
import type { Book } from '@/features/books/types'

type EditBookButtonProps = {
  book: Book
}

export function EditBookButton({ book }: EditBookButtonProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSave = async (data: {
    title: string
    author: string
    publicationDate: string
    description: string
    image: string
  }) => {
    await updateBook(book.id, data)
    setOpen(false)
    router.refresh()
  }

  const handleDelete = async () => {
    await deleteBook(book.id)
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-lg font-medium cursor-pointer hover:opacity-70 transition-opacity"
      >
        Editar
      </button>

      {open && (
        <BookModal
          book={book}
          onClose={() => setOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}
