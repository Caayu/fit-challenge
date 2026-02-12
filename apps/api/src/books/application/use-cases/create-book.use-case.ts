import { Inject, Injectable } from '@nestjs/common'
import { Book } from '../../domain/entities/book.entity'
import { BookAlreadyExistsError } from '../../domain/errors/book.errors'
import type { BookRepository } from '../../domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '../../domain/repositories/book.tokens'
import { CreateBookDto } from '../dto/create-book.dto'

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository
  ) {}

  async execute(dto: CreateBookDto): Promise<void> {
    const existingBook = await this.bookRepository.findByTitleAndAuthor(
      dto.title,
      dto.author
    )

    if (existingBook) {
      throw new BookAlreadyExistsError(dto.title, dto.author)
    }

    const book = new Book({
      title: dto.title,
      author: dto.author,
      publicationDate: dto.publicationDate,
      description: dto.description,
      image: dto.image
    })

    await this.bookRepository.save(book)
  }
}
