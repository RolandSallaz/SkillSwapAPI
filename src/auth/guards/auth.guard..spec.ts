import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const mockedJwtService = new JwtService({
      secret: 'test-secret',
    });
    expect(new AuthGuard(mockedJwtService)).toBeDefined();
  });
});
