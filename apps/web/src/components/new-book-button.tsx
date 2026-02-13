'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createBook } from '../actions/manage-books'
import { BookModal } from './book-modal'

export function NewBookButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSave = async (data: {
    title: string
    author: string
    publicationDate: string
    description: string
    image: string
  }) => {
    await createBook(data)
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xl md:text-2xl font-medium cursor-pointer"
      >
        Novo
      </button>

      {open && <BookModal onClose={() => setOpen(false)} onSave={handleSave} />}
    </>
  )
}
