export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'JWT-secret-key',
  },
});
