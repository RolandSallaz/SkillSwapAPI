import * as dotenv from 'dotenv';
import { logger } from './mainLogger';
dotenv.config();

export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwt: {
    accessTokenSecretExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'accessToken',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'refreshToken',
  },
});

logger.log(
  `Проверка подгрузки env ${JSON.stringify({
    port: process.env.PORT,
    jwt: {
      accessTokenSecretExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      accessTokenSecret: process.env.JWT_ACCESS_SECRET,
      refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    },
  }, null, 2)}`
);