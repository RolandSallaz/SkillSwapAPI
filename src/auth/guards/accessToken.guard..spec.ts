import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './accessToken.guard';

describe('AccessTokenGuard', () => {
  it('should be defined', () => {
    const mockedJwtService = new JwtService({
      secret: 'test-secret',
    });
    expect(new AccessTokenGuard(mockedJwtService)).toBeDefined();
  });
});
