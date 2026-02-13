'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { deleteBook } from '@/features/books/actions'
import { DeleteConfirmationModal } from '@/features/books/components/delete-confirmation-modal'

type DeleteBookButtonProps = {
  id: number
}

export function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const res = await deleteBook(id)
      if (res.success) {
        router.push('/')
      } else {
        alert(res.error)
        throw new Error(res.error)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message !== 'Failed to delete book') {
        alert('Erro ao excluir livro')
      }
      throw error
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="text-lg font-medium text-red-600 cursor-pointer hover:opacity-70 transition-opacity"
      >
        Excluir
      </button>

      {showConfirmation && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  )
}
