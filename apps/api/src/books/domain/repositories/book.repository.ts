import { Book } from '../entities/book.entity'

export interface BookRepository {
  save(book: Book): Promise<void>
  findAll(): Promise<Book[]>
  findByTitleAndAuthor(title: string, author: string): Promise<Book | null>
}
