import { DataSource, DataSourceOptions } from 'typeorm';
import { commonSource } from './ormconfig';

const config = {
  ...commonSource,
  port: parseInt(process.env.EXTERNAL_DATABASE_PORT ?? '15432'),
  synchronize: false,
};

export default new DataSource(config)