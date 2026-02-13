import type { Book } from '@/books/domain/entities/book.entity'
import type { BookRepository } from '@/books/domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '@/books/domain/repositories/book.tokens'
import { PaginationQueryDto } from '@/common/dto/pagination.dto'
import { PaginationResult } from '@/common/interfaces/pagination.interface'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository
  ) {}

  async execute(dto: PaginationQueryDto): Promise<PaginationResult<Book>> {
    return this.bookRepository.findAll({
      page: dto.page,
      limit: dto.limit,
      search: dto.search
    })
  }
}
