import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './accessToken.guard';
import {ConfigService} from "@nestjs/config";

describe('AccessTokenGuard', () => {
  it('should be defined', () => {
    const mockedJwtService = {} as JwtService;
    const mockedConfigService = {} as ConfigService;

    const guard = new AccessTokenGuard(
        mockedJwtService,
        mockedConfigService,
    )
    expect(guard).toBeDefined();
  });
});
