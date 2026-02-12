import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common'
import { CreateBookDto } from '../../application/dto/create-book.dto'
import { CreateBookUseCase } from '../../application/use-cases/create-book.use-case'
import { ListBooksUseCase } from '../../application/use-cases/list-books.use-case'
import { BookExceptionFilter } from './book-exception.filter'

@Controller('books')
@UseFilters(BookExceptionFilter)
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.createBookUseCase.execute(createBookDto)
  }

  @Get()
  findAll() {
    return this.listBooksUseCase.execute()
  }
}
