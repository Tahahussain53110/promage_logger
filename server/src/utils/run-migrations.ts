import { createConnection } from 'typeorm';

export const runMigrations = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DATABASE_PORT!, 10),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: false,
      logging: true,
      entities: ['src/entities/*.{js,ts}'],
      migrations: ['src/migrations/*.{js,ts}'],
      migrationsRun: process.env.RUN_MIGRATION === 'true',
      subscribers: [],
    });

    await connection.runMigrations();
    console.log('Migrations run successfully');
  } catch (error) {
    console.error('Error running migrations', error);
  }
};
