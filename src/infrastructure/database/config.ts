/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user',
  password: 'postgres',
  database: 'user',
  /* type: 'postgres',
  url: process.env.DB_URL,
  // synchronize: true,
  // migrationsRun: true, */
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : undefined,
  entities: [`${__dirname}/**/entity/*{.ts, .js}`],
  migrations: [`${__dirname}/**/migrations/*{.ts, .js}`]
})
