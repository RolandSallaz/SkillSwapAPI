// import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

// @WebSocketGateway()
// export class NotificationsGateway {
//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     return 'Hello world!';
//   }
// }

// ===========================================

// src/notifications/notifications.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer, // Для доступа к объекту сервера Socket.IO (для отправки сообщений)
  OnGatewayConnection, // Интерфейс для обработки подключения
  OnGatewayDisconnect, // Интерфейс для обработки отключения
  WsException, // Для обработки ошибок WebSocket
} from '@nestjs/websockets';

import { Server } from 'socket.io'; // Типизация Socket и Server из socket.io

import { logger } from 'src/logger/mainLogger';
import { JwtWsGuard } from './ws-jwt/ws-jwt.guard';

import { SocketWithUser } from './ws-jwt/types';

@WebSocketGateway({
  cors: {
    origin: '*', // Разрешить запросы от любых источников (для разработки).
    credentials: true, // Разрешить передачу учетных данных (например, куки, авторизационные заголовки)
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly jwtGuard: JwtWsGuard) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: SocketWithUser) {
    try {
      this.jwtGuard.verifyToken(client);
      const userId = client.data.user?.sub;

      if (!userId) {
        logger.warn(
          `[WS] Идентификатор пользователя не найден в полезной нагрузке токена.`,
        );
        throw new WsException(
          '[WS] Не удалось получить идентификатор пользователя из токена.',
        );
      }

      await client.join(userId);
      logger.info(
        `[WS] Клиент ${client.id} подключен и присоединен к комнате: ${userId}`,
      );

      // client.emit('connected', {
      //   message: 'Удачное подключение',
      //   userId,
      // });
    } catch (error) {
      if (error instanceof WsException) {
        logger.warn(
          `[WS] Сбой подключения для клиента ${client.id}: ${error.message}`,
        );
      } else if (error instanceof Error) {
        logger.error(
          `[WS] Необработанная ошибка во время подключения для клиента ${client.id}: ${error.message}`,
          error.stack,
        );
      } else {
        logger.error(
          `[WS] Неизвестная ошибка во время подключения для клиента ${client.id}: ${JSON.stringify(error)}`,
        );
      }
      client.disconnect(true);
    }
  }

  handleDisconnect(client: SocketWithUser) {
    const userId = client.data.user.sub;
    logger.info(
      `[WS] Клиент ${client.id} отключился. Идентификатор пользователя: ${userId || 'N/A'}`,
    );
  }

  notifyUser(
    userId: string,
    payload: { type: string; skillName: string; sender: string },
  ) {
    logger.info(
      `[WS] Попытка отправить уведомление пользователю ${userId} с полезной нагрузкой: ${JSON.stringify(payload)}`,
    );

    this.server.to(userId).emit('notificateNewRequest', payload);

    logger.info(
      `[WS] Уведомление 'notificateNewRequest' отправлено в комнату ${userId}. Полезная нагрузка: ${JSON.stringify(payload)}`,
    );
  }
}
