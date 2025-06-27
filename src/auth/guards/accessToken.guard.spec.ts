import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './accessToken.guard';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

type MockAuthRequest = {
  headers: { authorization?: string };
  user?: unknown;
};

describe('AccessTokenGuard', () => {
  let guard: AccessTokenGuard;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockRequest = (authorization?: string): MockAuthRequest => ({
    headers: { authorization },
    user: undefined,
  });

  const mockContext = (request: MockAuthRequest): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => request as MockAuthRequest,
      }),
    } as ExecutionContext;
  };

  beforeEach(() => {
    jwtService = {
      verify: jest.fn(),
    } as any;

    configService = {
      get: jest.fn().mockReturnValue('test_secret'),
    } as any;

    guard = new AccessTokenGuard(jwtService, configService);
  });

  it('должен быть определен', () => {
    expect(guard).toBeDefined();
  });

  describe('валидный токен', () => {
    it('должен пропускать запрос и устанавливать пользователя', () => {
      const validToken = 'valid_token';
      const request = mockRequest(`Bearer ${validToken}`);
      const context = mockContext(request);
      const payload = { userId: 1, username: 'test' };

      (jwtService.verify as jest.Mock).mockReturnValue(payload);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(request.user).toEqual(payload);
      expect(jwtService.verify).toHaveBeenCalledWith(validToken, {
        secret: 'test_secret',
      });
    });
  });

  describe('токен не передан', () => {
    it('должен выбрасывать UnauthorizedException', () => {
      const request = mockRequest();
      const context = mockContext(request);

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Требуется авторизация bearer',
      );
    });
  });

  describe('отсутствует Bearer', () => {
    it('должен выбрасывать UnauthorizedException при неправильном формате', () => {
      const request = mockRequest('InvalidTokenFormat');
      const context = mockContext(request);

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Требуется авторизация bearer',
      );
    });

    it('должен выбрасывать UnauthorizedException при только слове Bearer', () => {
      const request = mockRequest('Bearer');
      const context = mockContext(request);

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Требуется авторизация bearer',
      );
    });
  });

  describe('невалидный токен', () => {
    it('должен выбрасывать UnauthorizedException при ошибке верификации', () => {
      const invalidToken = 'invalid_token';
      const request = mockRequest(`Bearer ${invalidToken}`);
      const context = mockContext(request);

      (jwtService.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow('Требуется авторизация');
      expect(jwtService.verify).toHaveBeenCalledWith(invalidToken, {
        secret: 'test_secret',
      });
    });
  });
});
