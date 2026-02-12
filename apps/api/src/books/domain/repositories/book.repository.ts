import {
  PaginationParams,
  PaginationResult
} from '../../../common/interfaces/pagination.interface'
import { Book } from '../entities/book.entity'

export interface BookRepository {
  save(book: Book): Promise<void>
  findAll(params: PaginationParams): Promise<PaginationResult<Book>>
  findByTitleAndAuthor(title: string, author: string): Promise<Book | null>
  findById(id: number): Promise<Book | null>
  update(book: Book): Promise<void>
}
