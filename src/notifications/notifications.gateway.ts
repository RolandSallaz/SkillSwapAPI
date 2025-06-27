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
import { UseGuards, Logger } from '@nestjs/common'; // UseGuards для применения гарда, Logger для логирования
import { Socket, Server } from 'socket.io'; // Типизация Socket и Server из socket.io
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';
import { logger } from 'src/logger/mainLogger';

@UseGuards(WsJwtGuard)
// Настраиваем шлюз.
// В production 'origin' нужно ограничить до вашего домена.
@WebSocketGateway({
  cors: {
    origin: '*', // Разрешить запросы от любых источников (для разработки).
    credentials: true, // Разрешить передачу учетных данных (например, куки, авторизационные заголовки)
  },
  // Можно также указать путь, если он отличается от корневого
  // path: '/notifications',
})
// Применяем наш Guard на уровне Gateway. Все входящие соединения будут проходить через него.

export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  // Декоратор @WebSocketServer() инжектирует экземпляр сервера Socket.IO.
  // Это позволяет вам отправлять сообщения в комнаты или конкретным клиентам.
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(NotificationsGateway.name);

  /**
   * Метод вызывается, когда новый клиент успешно устанавливает WebSocket-соединение
   * и проходит через WsJwtGuard.
   *
   * @param client Объект Socket.IO, представляющий подключившегося клиента.
   */
  handleConnection(client: Socket, ...args: any[]) {
    try {
      // WsJwtGuard, который мы применили, уже проверил токен
      // и прикрепил пейлоуд пользователя к объекту client['user'].
      // Извлекаем ID пользователя из пейлоуда (предполагаем, что он в 'sub').
      logger.info("вывод");
      const userId = client['user']?.sub;

      // Эта проверка технически избыточна, так как Guard уже должен был отсеять
      // неавторизованных. Однако, это может быть полезно для отладки или если
      // `sub` по какой-то причине отсутствует в валидном токене.
      if (!userId) {
        this.logger.warn(
          `[Gateway] User ID not found in token payload for client: ${client.id}. Disconnecting.`,
        );
        client.disconnect(true); // Отключаем, если ID пользователя не найден.
        return;
      }

      // Присоединяем клиента к комнате, названной по его ID.
      // Это позволяет нам легко отправлять уведомления конкретному пользователю,
      // просто отправляя их в эту комнату.
      client.join(userId);
      this.logger.log(
        `[Gateway] Client ${client.id} connected and joined room: ${userId}`,
      );

      // Опционально: можно отправить клиенту подтверждение подключения
      // client.emit('connected', { message: 'Successfully connected to notifications service', userId });
    } catch (error) {
      // Этот блок catch будет ловить ошибки, которые не были обработаны Guard'ом,
      // или если произошла ошибка во время логики handleConnection (например, с базой данных).
      if (error instanceof WsException) {
        // Ошибки, выброшенные WsException, уже имеют понятное сообщение.
        this.logger.warn(
          `[Gateway] Connection failed for client ${client.id}: ${error.message}`,
        );
      } else {
        // Ловим любые другие непредвиденные ошибки.
        this.logger.error(
          `[Gateway] Unhandled error during connection for client ${client.id}: ${error.message}`,
          error.stack,
        );
      }
      // В любом случае, при ошибке отключаем клиента.
      client.disconnect(true);
    }
  }

  /**
   * Метод вызывается, когда клиент отключается от WebSocket-сервера.
   *
   * @param client Объект Socket.IO, представляющий отключившегося клиента.
   */
  handleDisconnect(client: Socket) {
    // Пейлоуд пользователя всё ещё может быть доступен на объекте client['user']
    const userId = client['user']?.sub;
    this.logger.log(
      `[Gateway] Client ${client.id} disconnected. User ID: ${userId || 'N/A'}`,
    );
    // Socket.IO автоматически удаляет клиента из всех комнат при отключении,
    // так что явный вызов `client.leave(userId)` здесь обычно не нужен.
  }

  /**
   * Метод для отправки уведомлений конкретному пользователю.
   * Этот метод будет вызываться из других сервисов вашего приложения (например, из RequestsService).
   *
   * @param userId ID пользователя, которому нужно отправить уведомление.
   * @param payload Объект, содержащий данные уведомления:
   * - type: string (тип уведомления, например, 'new_request', 'request_accepted')
   * - skillName: string (название навыка, к которому относится уведомление)
   * - sender: string (пользователь, от которого поступило уведомление)
   */
  notifyUser(
    userId: string,
    payload: { type: string; skillName: string; sender: string },
  ) {
    this.logger.log(
      `[Gateway] Attempting to send notification to user ${userId} with payload: ${JSON.stringify(payload)}`,
    );

    // Используем `this.server.to(userId).emit(...)` для отправки сообщения
    // всем клиентам, находящимся в комнате с ID пользователя.
    // Если пользователь не подключен или не присоединился к комнате,
    // Socket.IO просто не найдет клиентов в этой комнате и ничего не отправит.
    this.server.to(userId).emit('notificateNewRequest', payload);

    this.logger.log(
      `[Gateway] Notification 'notificateNewRequest' sent to room ${userId}. Payload: ${JSON.stringify(payload)}`,
    );
  }

  // Если вам нужен тестовый обработчик сообщения, вы можете добавить его обратно
  // @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: any): string {
  //   this.logger.log(`[Gateway] Message received from client ${client.id}: ${JSON.stringify(payload)}`);
  //   client.emit('messageAck', 'Message received!'); // Отправить подтверждение клиенту
  //   return 'Hello from server!'; // Может быть отправлено как ответ на запрос
  // }
}
