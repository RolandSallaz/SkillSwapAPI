import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  const port = configService.get<number>('port') as number;
  await app.listen(port);
  console.log(`Port: ${port}`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
