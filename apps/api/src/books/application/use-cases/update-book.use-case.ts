import { Inject, Injectable } from '@nestjs/common'
import { BookNotFoundError } from '../../domain/errors/book.errors'
import type { BookRepository } from '../../domain/repositories/book.repository'
import { UpdateBookDto } from '../dto/update-book.dto'

@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject('BookRepository')
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
