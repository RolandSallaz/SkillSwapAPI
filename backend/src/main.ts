import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/all-exception.filter';
import { WinstonLoggerService } from './logger/winston-logger.service';
import { logger } from './logger/mainLogger';
import { HttpLoggerMiddleware } from './logger/http-logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
  });
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter(configService));
  app.use(new HttpLoggerMiddleware().use);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useWebSocketAdapter(new IoAdapter(app));
  const config = new DocumentBuilder()
    .setTitle('SkillSwap API')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, documentFactory);
  const port = configService.get<number>('port') as number;
  await app.listen(port);
  logger.info(`app listen port: ${port}`);

  // Отдельный WebSocket сервер
  const wsPort = configService.get<number>('WS_PORT') as number;
  const wsServer = createServer();
  const io = new SocketIOServer(wsServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    logger.info(`WebSocket client connected: ${socket.id}`);
  });

  wsServer.listen(wsPort, () => {
    logger.info(`WebSocket server listening on port ${wsPort}`);
  });
}
bootstrap().catch((err) => {
  logger.error(err);
  process.exit(1);
});
