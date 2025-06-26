import { DataSource, EntityManager, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from '../config/ormconfig-migration';

export type SeedFn<T extends ObjectLiteral = ObjectLiteral> = (
  repository: Repository<T>,
  entityManager?: EntityManager,
) => Promise<void>;

export type SeedMessages = {
  success: string;
  error?: string;
};

export const SeedMessagesDefault: Required<Pick<SeedMessages, 'error'>> = {
  error: 'Ошибка сидирования',
};

export type SeedSettings = {
  dataSource: DataSource;
  clearBefore: boolean;
};

export const SeedSettingsDefault: SeedSettings = {
  dataSource: AppDataSource,
  clearBefore: false,
};
