'use client'

import Image from 'next/image'
import { useRef } from 'react'

import { uploadImage } from '@/features/books/actions'
import { resolveImageUrl } from '@/lib/image'

type BookCoverInputProps = {
  imageUrl: string
  onImageChange: (url: string) => void
  uploading: boolean
  setUploading: (uploading: boolean) => void
}

export function BookCoverInput({
  imageUrl,
  onImageChange,
  uploading,
  setUploading
}: BookCoverInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      onImageChange(url)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
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
    </>
  )
}
