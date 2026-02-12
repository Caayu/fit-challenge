import { Inject, Injectable } from '@nestjs/common'
import type { Book } from '../../domain/entities/book.entity'
import type { BookRepository } from '../../domain/repositories/book.repository'

@Injectable()
export class ListBooksUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository
  ) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll()
  }
}
