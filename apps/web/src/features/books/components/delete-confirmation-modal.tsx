'use client'

import { useState } from 'react'

type DeleteConfirmationModalProps = {
  onConfirm: () => Promise<void> | void
  onCancel: () => void
}

export function DeleteConfirmationModal({
  onConfirm,
  onCancel
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      style={{ zIndex: 9999 }}
      onClick={isDeleting ? undefined : onCancel}
    >
      <div
        className="bg-[#f5f5f5] rounded-3xl w-full max-w-md mx-4 p-8 flex flex-col items-center gap-4 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[#111111] mt-2">Tem certeza?</h2>

        <p className="text-[#666666] text-base leading-relaxed mb-4">
          Ao excluir este livro não será possível recuperá-lo. Realmente deseja
          excluí-lo?
        </p>

        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-8 py-3 rounded-full bg-[#d0d0d0] text-[#111111] font-medium cursor-pointer hover:bg-[#c0c0c0] transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 px-8 py-3 rounded-full bg-[#B20000] text-white font-medium cursor-pointer hover:bg-[#990000] transition-colors disabled:opacity-50"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
