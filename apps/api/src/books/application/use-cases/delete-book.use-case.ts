import type { BookRepository } from '@/books/domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '@/books/domain/repositories/book.tokens'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository
  ) {}

  async execute(id: number): Promise<void> {
    await this.bookRepository.delete(id)
  }
}
