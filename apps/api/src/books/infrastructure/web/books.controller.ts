import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaginationQueryDto } from '../../../common/dto/pagination.dto'
import { CreateBookDto } from '../../application/dto/create-book.dto'
import { UpdateBookDto } from '../../application/dto/update-book.dto'
import { CreateBookUseCase } from '../../application/use-cases/create-book.use-case'
import { ListBooksUseCase } from '../../application/use-cases/list-books.use-case'
import { UpdateBookUseCase } from '../../application/use-cases/update-book.use-case'
import { BookExceptionFilter } from './book-exception.filter'

@ApiTags('books')
@Controller('books')
@UseFilters(BookExceptionFilter)
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.'
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Book already exists.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.createBookUseCase.execute(createBookDto)
  }

  @Get()
  @ApiOperation({ summary: 'List all books with pagination and search' })
  @ApiResponse({
    status: 200,
    description: 'Return all books.'
  })
  findAll(@Query() query: PaginationQueryDto) {
    return this.listBooksUseCase.execute(query)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.'
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto
  ) {
    return this.updateBookUseCase.execute(id, updateBookDto)
  }
}
