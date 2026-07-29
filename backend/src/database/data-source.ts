import 'reflect-metadata';
import { DataSource } from 'typeorm';

const isTs = process.env.NODE_ENV !== 'production';

const defaultSqlite = {
  type: 'sqlite' as const,
  database: process.env.DB_SQLITE_PATH || 'database/dev.sqlite',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || true,
  logging: process.env.TYPEORM_LOGGING === 'true' || false,
  entities: [isTs ? __dirname + '/entities/*.ts' : __dirname + '/entities/*.js']
};

const postgresConfig = process.env.DATABASE_URL
  ? {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || false,
      logging: process.env.TYPEORM_LOGGING === 'true' || false,
      entities: [isTs ? __dirname + '/entities/*.ts' : __dirname + '/entities/*.js']
    }
  : null;

export const AppDataSource = new DataSource(postgresConfig ?? defaultSqlite);

export default AppDataSource;
