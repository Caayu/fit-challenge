import { pgTable, serial, text, date, timestamp } from 'drizzle-orm/pg-core'

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  publicationDate: date('publication_date').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})
