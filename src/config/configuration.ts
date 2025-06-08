import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwt: {
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    accessToken: process.env.JWT_ACCESS_SECRET || 'accessToken',
    refreshToken: process.env.JWT_REFRESH_SECRET || 'refreshToken',
  },
});
