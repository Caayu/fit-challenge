import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/pg-core'

export const books = pgTable(
  'books',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    publicationDate: date('publication_date').notNull(),
    description: text('description').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  },
  (t) => {
    return {
      uniqueTitleAuthor: uniqueIndex('unique_title_author').on(
        t.title,
        t.author
      )
    }
  }
)
