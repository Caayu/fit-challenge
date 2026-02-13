import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/**/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production'
      }
    : {
        host: process.env.DATABASE_HOST!,
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!,
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        ssl: process.env.NODE_ENV === 'production'
      }
})
