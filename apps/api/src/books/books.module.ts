import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateBookUseCase } from './application/use-cases/create-book.use-case'
import { ListBooksUseCase } from './application/use-cases/list-books.use-case'
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
    ListBooksUseCase
  ]
})
export class BooksModule {}
