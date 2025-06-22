import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from "path";
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config({ path: path.resolve(__dirname, "../../.env.example") });

export const commonSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.INTERIOR_DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'skillswap',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
} 

export const AppDataSource = new DataSource(commonSource) 

