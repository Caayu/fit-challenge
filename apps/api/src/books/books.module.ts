import { CreateBookUseCase } from '@/books/application/use-cases/create-book.use-case'
import { DeleteBookUseCase } from '@/books/application/use-cases/delete-book.use-case'
import { GetBookUseCase } from '@/books/application/use-cases/get-book.use-case'
import { ListBooksUseCase } from '@/books/application/use-cases/list-books.use-case'
import { UpdateBookUseCase } from '@/books/application/use-cases/update-book.use-case'
import { BOOK_REPOSITORY } from '@/books/domain/repositories/book.tokens'
import { DrizzleBookRepository } from '@/books/infrastructure/persistence/drizzle/repositories/drizzle-book.repository'
import { BooksController } from '@/books/infrastructure/web/books.controller'
import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    {
      provide: BOOK_REPOSITORY,
      useClass: DrizzleBookRepository
    },
    CreateBookUseCase,
    GetBookUseCase,
    ListBooksUseCase,
    UpdateBookUseCase,
    DeleteBookUseCase
  ]
})
export class BooksModule {}
