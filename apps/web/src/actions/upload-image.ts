'use server'

import { API_URL } from '../config/env'

export async function uploadImage(formData: FormData): Promise<string> {
  const res = await fetch(`${API_URL}/api/upload/image`, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  return data.url
}
