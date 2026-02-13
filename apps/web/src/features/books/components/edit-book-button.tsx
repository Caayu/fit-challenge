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
    const res = await updateBook(book.id, data)
    if (res.success) {
      setOpen(false)
      router.refresh()
    } else {
      alert(res.error)
    }
  }

  const handleDelete = async () => {
    const res = await deleteBook(book.id)
    if (res.success) {
      setOpen(false)
      router.refresh()
    } else {
      alert(res.error)
    }
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
