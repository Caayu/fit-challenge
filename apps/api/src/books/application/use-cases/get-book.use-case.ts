import { Book } from '@/books/domain/entities/book.entity'
import { BookNotFoundError } from '@/books/domain/errors/book.errors'
import type { BookRepository } from '@/books/domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '@/books/domain/repositories/book.tokens'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository
  ) {}

  async execute(id: number): Promise<Book> {
    const book = await this.bookRepository.findById(id)
    if (!book) {
      throw new BookNotFoundError(id)
    }
    return book
  }
}
