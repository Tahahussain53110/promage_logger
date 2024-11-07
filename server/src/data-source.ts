import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { __prod__ } from './utils/constants';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.DATABASE_PORT!, 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: !__prod__,
  entities: ['src/entities/*.{js,ts}'],
  migrations: ['src/migrations/*.{js,ts}'],
  migrationsRun: process.env.RUN_MIGRATION === 'true',
  subscribers: [],
});
