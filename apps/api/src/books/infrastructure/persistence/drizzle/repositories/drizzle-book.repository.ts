import { Inject, Injectable } from '@nestjs/common'
import { and, desc, eq } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { DATABASE_CONNECTION } from '../../../../../database/database-connection'
import { Book } from '../../../../domain/entities/book.entity'
import { BookRepository } from '../../../../domain/repositories/book.repository'
import * as schema from '../schemas/book.schema'

@Injectable()
export class DrizzleBookRepository implements BookRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async save(book: Book): Promise<void> {
    const props = book.getProps()
    await this.db
      .insert(schema.books)
      .values({
        title: props.title,
        author: props.author,
        publicationDate: props.publicationDate.toISOString(),
        description: props.description,
        image: props.image
      })
      .onConflictDoNothing()
  }

  async findAll(): Promise<Book[]> {
    const records = await this.db.query.books.findMany({
      orderBy: [desc(schema.books.publicationDate)]
    })

    return records.map(
      (record) =>
        new Book({
          id: record.id,
          title: record.title,
          author: record.author,
          publicationDate: record.publicationDate,
          description: record.description,
          image: record.image,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt
        })
    )
  }

  async findByTitleAndAuthor(
    title: string,
    author: string
  ): Promise<Book | null> {
    const record = await this.db.query.books.findFirst({
      where: and(eq(schema.books.title, title), eq(schema.books.author, author))
    })

    if (!record) return null

    return new Book({
      id: record.id,
      title: record.title,
      author: record.author,
      publicationDate: record.publicationDate,
      description: record.description,
      image: record.image,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    })
  }
}
