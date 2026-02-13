'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { uploadImage } from '@/features/books/actions'
import { DeleteConfirmationModal } from '@/features/books/components/delete-confirmation-modal'
import type { Book } from '@/features/books/types'
import { resolveImageUrl } from '@/lib/image'

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
  onDelete?: () => Promise<void>
}

export function BookModal({ book, onClose, onSave, onDelete }: BookModalProps) {
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
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const isEdit = !!book

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const url = await uploadImage(formData)
      setImageUrl(url)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!title || !author || !publicationDate || !description || !imageUrl)
      return

    const [day, month, year] = publicationDate.split('/')
    if (!day || !month || !year) {
      alert('Data inválida. Use o formato DD/MM/AAAA')
      return
    }

    const isoDate = `${year}-${month}-${day}`

    setSaving(true)
    try {
      await onSave({
        title,
        author,
        publicationDate: isoDate,
        description,
        image: imageUrl
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (onDelete) {
      await onDelete()
    }
    setShowDeleteConfirmation(false)
  }

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
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none"
              />
              <input
                type="text"
                placeholder="Autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none"
              />
              <input
                type="text"
                placeholder="Data de publicação"
                value={publicationDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '')
                  if (value.length > 8) value = value.slice(0, 8)

                  if (value.length >= 5) {
                    value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`
                  } else if (value.length >= 3) {
                    value = `${value.slice(0, 2)}/${value.slice(2)}`
                  }

                  setPublicationDate(value)
                }}
                maxLength={10}
                className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none"
              />
            </div>

            <div
              onClick={handleImageClick}
              className="w-[200px] h-[200px] rounded-lg bg-[#f5f5f5] flex items-center justify-center cursor-pointer overflow-hidden shrink-0"
              title="Clique para alterar a imagem"
            >
              {imageUrl ? (
                <Image
                  src={resolveImageUrl(imageUrl)}
                  alt="Capa"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-sm">
                    {uploading ? 'Enviando...' : 'Escolher imagem'}
                  </span>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 rounded-lg bg-[#f5f5f5] text-[#111111] placeholder-gray-400 outline-none resize-none"
          />

          <div className="flex justify-center gap-4">
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="px-10 py-3 rounded-full bg-red-100 text-red-600 font-medium cursor-pointer hover:bg-red-200 transition-colors mr-auto"
              >
                Excluir
              </button>
            )}

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

      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  )
}
