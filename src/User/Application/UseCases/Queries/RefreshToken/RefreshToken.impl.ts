import { QueryHandler } from '@nestjs/cqrs';
import { RefreshTokenQuery } from './RefreshToken.query';
import { RefreshToken } from './RefreshToken';
import { TokenService } from 'src/Common/Application/Output/Token.service';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';

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
    if (!user) throw new NotFoundException('user not found');

    const accessToken: string =
      await this.tokenRepository.generateAccessToken(user);

    return accessToken;
  }
}
