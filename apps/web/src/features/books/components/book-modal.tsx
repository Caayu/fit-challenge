'use client'

import { BookCoverInput } from '@/features/books/components/book-cover-input'
import { useBookForm } from '@/features/books/hooks/use-book-form'
import type { Book } from '@/features/books/types'

type BookModalProps = {
  book?: Book
  onClose: () => void
  onSave: (data: {
    title: string
    author: string
    publicationDate: string
    description: string
    image: string
  }) => Promise<void>
}

export function BookModal({ book, onClose, onSave }: BookModalProps) {
  const {
    register,
    errors,
    setValue,
    watch,
    handleDateChange,
    handleSubmit,
    saving
  } = useBookForm({ book, onSave })

  const isEdit = !!book

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl w-full max-w-2xl mx-4 p-8 flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-center text-[#111111]">
            {isEdit ? 'Editar livro' : 'Novo livro'}
          </h2>

          <div className="flex gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Título"
                  {...register('title')}
                  className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm ml-1">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Autor"
                  {...register('author')}
                  className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none"
                />
                {errors.author && (
                  <span className="text-red-500 text-sm ml-1">
                    {errors.author.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Data de publicação"
                  {...register('publicationDate')}
                  onChange={handleDateChange}
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none"
                />
                {errors.publicationDate && (
                  <span className="text-red-500 text-sm ml-1">
                    {errors.publicationDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <BookCoverInput
                imageUrl={watch('image')}
                onImageChange={(url) =>
                  setValue('image', url, { shouldValidate: true })
                }
              />
              {errors.image && (
                <span className="text-red-500 text-sm text-center">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              placeholder="Descrição"
              {...register('description')}
              rows={8}
              className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none resize-none"
            />
            {errors.description && (
              <span className="text-red-500 text-sm ml-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-10 py-3 rounded-full bg-[#e0e0e0] text-[#111111] font-medium cursor-pointer hover:bg-[#d0d0d0] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-10 py-3 rounded-full bg-[#7EC8E3] text-white font-medium cursor-pointer hover:bg-[#5bb8d8] transition-colors disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
