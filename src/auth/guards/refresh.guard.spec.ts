import { Reflector } from '@nestjs/core';
import { RefreshTokenGuard } from './refresh.guard';

describe('RefreshTokenGuard', () => {
  it('should be defined', () => {
    const mockedReflector = new Reflector();
    expect(new RefreshTokenGuard(mockedReflector)).toBeDefined();
  });
});
