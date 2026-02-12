import { Inject, Injectable } from '@nestjs/common'
import { Book } from '../../domain/entities/book.entity'
import { BookNotFoundError } from '../../domain/errors/book.errors'
import type { BookRepository } from '../../domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '../../domain/repositories/book.tokens'

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
