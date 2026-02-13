'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { createBook } from '@/features/books/actions'
import { BookModal } from '@/features/books/components/book-modal'

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
    const res = await createBook(data)
    if (res.success) {
      setOpen(false)
      toast.success('Livro criado com sucesso!')
      router.refresh()
    } else {
      toast.error(res.error)
    }
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
