import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/ormconfig';

@Module({
  imports: [
    //загружаем переменные окружения
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // подключаем TypeORM с настройками из ormconfig.ts
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
