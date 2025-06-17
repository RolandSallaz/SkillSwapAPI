import * as dotenv from 'dotenv';
import { logger } from './mainLogger';
import * as process from "node:process";
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
});

logger.log(
  `Проверка подгрузки env ${JSON.stringify(
    {
      port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
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
