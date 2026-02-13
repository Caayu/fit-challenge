import type { Book } from '@/features/books/types'
import { useState, useTransition } from 'react'

type UseBookFormProps = {
  book?: Book
  onSave: (data: {
    title: string
    author: string
    publicationDate: string
    description: string
    image: string
  }) => Promise<void>
}

export function useBookForm({ book, onSave }: UseBookFormProps) {
  const [title, setTitle] = useState(book?.title ?? '')
  const [author, setAuthor] = useState(book?.author ?? '')
  const [publicationDate, setPublicationDate] = useState(
    book?.publicationDate
      ? new Date(book.publicationDate).toLocaleDateString('pt-BR')
      : ''
  )
  const [description, setDescription] = useState(book?.description ?? '')
  const [imageUrl, setImageUrl] = useState(book?.image ?? '')
  const [uploading, setUploading] = useState(false)
  const [saving, startTransition] = useTransition()

  const handleDateChange = (value: string) => {
    let formatted = value.replace(/\D/g, '')
    if (formatted.length > 8) formatted = formatted.slice(0, 8)

    if (formatted.length >= 5) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}/${formatted.slice(4)}`
    } else if (formatted.length >= 3) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`
    }

    setPublicationDate(formatted)
  }

  const handleSubmit = () => {
    if (!title || !author || !publicationDate || !description || !imageUrl)
      return

    const [day, month, year] = publicationDate.split('/')
    if (!day || !month || !year) {
      alert('Data inválida. Use o formato DD/MM/AAAA')
      return
    }

    const isoDate = `${year}-${month}-${day}`

    startTransition(async () => {
      await onSave({
        title,
        author,
        publicationDate: isoDate,
        description,
        image: imageUrl
      })
    })
  }

  return {
    formState: {
      title,
      author,
      publicationDate,
      description,
      imageUrl,
      uploading,
      saving
    },
    setters: {
      setTitle,
      setAuthor,
      handleDateChange,
      setDescription,
      setImageUrl,
      setUploading
    },
    handleSubmit
  }
}
