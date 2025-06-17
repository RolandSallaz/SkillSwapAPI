import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { logger } from './config/mainLogger';
import { AllExceptionFilter } from './common/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter());
  const port = configService.get<number>('port') as number;
  await app.listen(port);
  logger.log(`app listen port: ${port}`);
}
bootstrap().catch((err) => {
  logger.error(err);
  process.exit(1);
});
