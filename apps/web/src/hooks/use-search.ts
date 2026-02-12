'use client'

import debounce from 'lodash.debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

export function useSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const debouncedNavigate = useRef(
    debounce((value: string) => {
      const params = new URLSearchParams(window.location.search)

      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }

      router.replace(`?${params.toString()}`)
    }, 300)
  ).current

  const handleChange = (value: string) => {
    setQuery(value)
    debouncedNavigate(value)
  }

  return { query, handleChange }
}
