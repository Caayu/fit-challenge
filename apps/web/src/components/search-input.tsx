'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

type SearchInputProps = {
  placeholder?: string
}

export function SearchInput({ placeholder = 'Buscar' }: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    router.replace(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between w-full h-[54px] bg-white rounded-xl px-4 py-[17px] outline-2 outline-transparent focus-within:outline-[#444444]">
      <input
        type="text"
        defaultValue={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-lg bg-transparent outline-none placeholder-[#444444] text-black"
      />
      <Search size={24} color="#444444" />
    </div>
  )
}
