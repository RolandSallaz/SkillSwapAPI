import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtService } from '@nestjs/jwt'; // Импортируем JwtService для работы с JWT
import { WsException } from '@nestjs/websockets'; // Для выбрасывания WebSocket-специфичных исключений
import { Socket } from 'socket.io';
import { logger } from 'src/logger/mainLogger';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private readonly nestLogger = new Logger(WsJwtGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.nestLogger.warn(`[WS-Guard] === ГАРДА АКТИВИРОВАНА ===`);
    logger.info('хэй22');
    return false;

    // 1. Получаем объект Socket.io из контекста выполнения
    // const client: Socket = context.switchToWs().getClient();
    const client = context.switchToWs().getClient<Socket>();
    logger.warn(`Ток`);
    // 2. Извлекаем JWT-токен из параметров запроса (query) рукопожатия WebSocket
    // Токен ожидается в формате ws://localhost:3000?token=YOUR_JWT_TOKEN
    const token = client.handshake.query?.token as string;
    logger.info(`Токен = ${token}`);
    // 3. Проверяем наличие токена
    // if (!token) {
    //   // Если токена нет, выбрасываем исключение WsException, которое будет поймано Socket.IO
    //   // и приведет к отключению клиента с соответствующим сообщением.
    //   throw new WsException('Unauthorized: No token provided');
    // }

    // 4. Верифицируем JWT-токен
    try {
      // Используем JwtService для асинхронной верификации токена.
      // `secret` должен быть тем же самым ключом, который использовался для подписи токена.
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: 'YOUR_JWT_SECRET', // !!! ВАЖНО: Замените на ваш реальный, надежный секретный ключ JWT
      // });

      // 5. Прикрепляем полезную нагрузку (payload) токена к объекту сокета.
      // Это позволит другим частям вашего гейтвея (например, handleConnection)
      // получить доступ к данным авторизованного пользователя (например, его ID).
      // client['user'] = payload; // Используем индексатор, так как `user` нет в стандартной типизации Socket.
      // this.logger.log(
      //   `[WS-Auth] Client ${client.id} authorized. User ID: ${payload.sub}`,
      // );

      // 6. Возвращаем `true`, если авторизация прошла успешно.
      // Это означает, что соединение разрешено и может быть установлено.
      return false;
    } catch (error) {
      // 7. Обрабатываем ошибки верификации токена
      // Если токен недействителен (просрочен, неверная подпись, поврежден и т.д.)
      // this.logger.error(
      //   `[WS-Auth] Connection denied: Invalid token for client ${client.id} - ${error.message}`,
      // );
      throw new WsException('Unauthorized: Invalid token');
    }

    return true;
  }
}
