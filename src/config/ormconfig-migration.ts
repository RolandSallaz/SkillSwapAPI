import { DataSource } from 'typeorm';
import { commonDataSource } from './configuration';

const config = {
  ...commonDataSource,
  name: 'authConnection',
  port: parseInt(process.env.EXTERNAL_DATABASE_PORT ?? '15432'),
  synchronize: false,
};

export default new DataSource(config)