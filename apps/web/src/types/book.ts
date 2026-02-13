export type Book = {
  id: number
  title: string
  author: string
  publicationDate: string
  description: string
  image: string
}

export type BooksResponse = {
  data: Book[]
  meta: {
    total: number
    page: number
    lastPage: number
    previousPage: number | null
    nextPage: number | null
  }
}
