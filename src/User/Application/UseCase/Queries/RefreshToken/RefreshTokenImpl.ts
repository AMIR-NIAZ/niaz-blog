import { QueryHandler } from '@nestjs/cqrs';
import { RefreshTokenQuery } from './RefreshTokenQuery';
import { RefreshToken } from './RefreshToken';
import { TokenService } from 'src/common/Application/Output/TokenService';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/User/Application/Output/UserRepsitory';

@QueryHandler(RefreshTokenQuery)
export class RefreshTokenImpl implements RefreshToken {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(TokenService)
    private readonly tokenRepository: TokenService,
  ) {}

  async execute(query: RefreshTokenQuery): Promise<string> {
    const payload = await this.tokenRepository.verfiyRefreshToken(
      query.refreshToken,
    );

    const user = await this.userRepository.loadById(payload.sub);
    if (!user) throw new Error();

    const accessToken: string =
      await this.tokenRepository.generateAccessToken(user);

    return accessToken;
  }
}
