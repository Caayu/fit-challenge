import * as booksSchema from '@/books/infrastructure/persistence/drizzle/schemas/book.schema'
import { Global, Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { DATABASE_CONNECTION } from './database-connection'

const schema = {
  ...booksSchema
}

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => {
        const connectionString = process.env.DATABASE_URL

        const poolConfig = connectionString
          ? {
              connectionString,
              ssl:
                process.env.NODE_ENV === 'production'
                  ? { rejectUnauthorized: false }
                  : false
            }
          : {
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT || '5432'),
              user: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME
            }

        const pool = new Pool(poolConfig)
        return drizzle(pool, { schema })
      }
    }
  ],
  exports: [DATABASE_CONNECTION]
})
export class DatabaseModule {}
