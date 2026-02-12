'use client'

import { Search } from 'lucide-react'
import { useSearch } from '../hooks/use-search'

type SearchInputProps = {
  placeholder?: string
}

export function SearchInput({ placeholder = 'Buscar' }: SearchInputProps) {
  const { query, handleChange } = useSearch()

  return (
    <div className="flex items-center justify-between w-full h-[54px] bg-white rounded-xl px-4 py-[17px] outline-2 outline-transparent focus-within:outline-[#444444]">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-lg bg-transparent outline-none placeholder-[#444444] text-black"
      />
      <Search size={24} color="#444444" />
    </div>
  )
}
