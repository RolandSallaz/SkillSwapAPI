import * as dotenv from 'dotenv';
import { logger } from 'src/logger/mainLogger';
dotenv.config();

export default () => ({
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    accessTokenSecretExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'accessToken',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'refreshToken',
  },
  salt: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  upload: {
    dir: process.env.UPLOAD_DIR || './public/uploads',
    fileSizeMax: Number(process.env.UPLOAD_FILE_SIZE_MAX || 2 * 1024 * 1024),
  },
});

logger.info(
  `Проверка подгрузки env ${JSON.stringify(
    {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV,
      databaseName: process.env.DATABASE_NAME,
      jwt: {
        accessTokenSecretExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        accessTokenSecret: process.env.JWT_ACCESS_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
      },
    },
    null,
    2,
  )}`,
);
