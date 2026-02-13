const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export function resolveImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${PUBLIC_API_URL}${path}`
}
