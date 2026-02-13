'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { resolveImageUrl } from '@/lib/image'

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='180'%3E%3Crect width='120' height='180' fill='%23ccc' rx='4'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='14' fill='%23666'%3ESem capa%3C/text%3E%3C/svg%3E"

type BookCardProps = {
  id: number
  title: string
  description: string
  image: string
}

export function BookCard({ id, title, description, image }: BookCardProps) {
  const [src, setSrc] = useState(resolveImageUrl(image))

  return (
    <Link
      href={`/books/${id}`}
      className="w-full aspect-3/4 rounded-2xl bg-white flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="relative flex items-center justify-center p-4 bg-[#E0E0E2] rounded-t-2xl">
        <Image
          src={src}
          alt={title}
          width={120}
          height={180}
          className="h-[180px] w-auto object-contain"
          onError={() => setSrc(FALLBACK_IMAGE)}
          unoptimized
        />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-4">
        <h3 className="text-xl font-semibold leading-none">{title}</h3>
        <p className="text-sm text-gray-600 text-justify leading-relaxed line-clamp-6">
          {description}
        </p>
      </div>
    </Link>
  )
}
