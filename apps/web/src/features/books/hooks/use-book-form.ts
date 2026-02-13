import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { bookSchema, type BookFormData } from '@/features/books/schemas'
import type { Book } from '@/features/books/types'

type UseBookFormProps = {
  book?: Book
  onSave: (data: BookFormData) => Promise<void>
}

export function useBookForm({ book, onSave }: UseBookFormProps) {
  const [saving, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      description: book?.description ?? '',
      image: book?.image ?? '',
      publicationDate: book?.publicationDate
        ? (() => {
            const datePart = book.publicationDate.split('T')[0]
            if (!datePart) return ''
            const [year, month, day] = datePart.split('-')
            return `${day}/${month}/${year}`
          })()
        : ''
    }
  })

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 8) value = value.slice(0, 8)

    if (value.length >= 5) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`
    } else if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`
    }

    setValue('publicationDate', value, { shouldValidate: true })
  }

  const onSubmit = handleSubmit((data) => {
    const [day, month, year] = data.publicationDate.split('/')
    const isoDate = `${year}-${month}-${day}`

    startTransition(async () => {
      await onSave({
        ...data,
        publicationDate: isoDate
      })
    })
  })

  return {
    register,
    errors,
    watch,
    setValue,
    handleDateChange,
    handleSubmit: onSubmit,
    saving
  }
}
