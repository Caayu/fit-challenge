import { Inject, Injectable } from '@nestjs/common'
import { PaginationQueryDto } from '../../../common/dto/pagination.dto'
import { PaginationResult } from '../../../common/interfaces/pagination.interface'
import type { Book } from '../../domain/entities/book.entity'
import type { BookRepository } from '../../domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '../../domain/repositories/book.tokens'

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
