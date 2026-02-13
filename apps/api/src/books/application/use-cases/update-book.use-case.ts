import { UpdateBookDto } from '@/books/application/dto/update-book.dto'
import { BookNotFoundError } from '@/books/domain/errors/book.errors'
import type { BookRepository } from '@/books/domain/repositories/book.repository'
import { BOOK_REPOSITORY } from '@/books/domain/repositories/book.tokens'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository
  ) {}

  async execute(id: number, dto: UpdateBookDto): Promise<void> {
    const book = await this.bookRepository.findById(id)
    if (!book) {
      throw new BookNotFoundError(id)
    }

    book.update({
      title: dto.title,
      author: dto.author,
      publicationDate: dto.publicationDate,
      description: dto.description,
      image: dto.image
    })

    await this.bookRepository.update(book)
  }
}
