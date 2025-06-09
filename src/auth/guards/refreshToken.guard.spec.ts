import { JwtService } from '@nestjs/jwt';
import { RefreshTokenGuard } from './refreshToken.guard';

describe('RefreshTokenGuard', () => {
  it('should be defined', () => {
    const mockedJwtService = new JwtService({
      secret: 'test-secret',
    });
    expect(new RefreshTokenGuard(mockedJwtService)).toBeDefined();
  });
});
