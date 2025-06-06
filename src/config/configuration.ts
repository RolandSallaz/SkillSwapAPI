export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwt: {
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    secret: process.env.JWT_SECRET || 'JWT-secret-key',
  },
});
