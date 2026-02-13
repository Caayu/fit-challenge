import { CreateBookDto } from '@/books/application/dto/create-book.dto'
import { Book } from '@/books/domain/entities/book.entity'
import { BookAlreadyExistsError } from '@/books/domain/errors/book.errors'
import type { BookRepository } from '@/books/domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '@/books/domain/repositories/book.tokens'
import { Inject, Injectable } from '@nestjs/common'

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
