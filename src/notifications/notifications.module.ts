import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';

@Module({
  providers: [NotificationsGateway, WsJwtGuard],
})
export class NotificationsModule {}
