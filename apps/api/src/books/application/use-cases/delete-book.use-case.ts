import { Inject, Injectable } from '@nestjs/common'
import type { BookRepository } from '../../domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '../../domain/repositories/book.tokens'

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
