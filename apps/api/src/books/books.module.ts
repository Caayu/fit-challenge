import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateBookUseCase } from './application/use-cases/create-book.use-case'
import { GetBookUseCase } from './application/use-cases/get-book.use-case'
import { ListBooksUseCase } from './application/use-cases/list-books.use-case'
import { UpdateBookUseCase } from './application/use-cases/update-book.use-case'
import { DrizzleBookRepository } from './infrastructure/persistence/drizzle/repositories/drizzle-book.repository'
import { BooksController } from './infrastructure/web/books.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    {
      provide: 'BookRepository',
      useClass: DrizzleBookRepository
    },
    CreateBookUseCase,
    GetBookUseCase,
    ListBooksUseCase,
    UpdateBookUseCase
  ]
})
export class BooksModule {}
