import { JwtService } from '@nestjs/jwt';
import { RefreshTokenGuard } from './refreshToken.guard';
import { ConfigService } from '@nestjs/config';

describe('RefreshTokenGuard', () => {
  it('should be defined', () => {
    const mockedJwtService = {} as JwtService;
    const mockedConfigService = {} as ConfigService;

    const guard = new RefreshTokenGuard(mockedJwtService, mockedConfigService);
    expect(guard).toBeDefined();
  });
});
