import { QueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './Login.query';
import { Login } from './Login';
import { Tokens } from 'src/Common/Application/Tokens';
import Email from 'src/User/Domain/ValueObjects/Email';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import { Inject } from '@nestjs/common';
import { HashService } from 'src/Common/Application/Output/Hash.service';
import { TokenService } from 'src/Common/Application/Output/Token.service';
import Password from 'src/User/Domain/ValueObjects/Password';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';
import UnauthorizedException from 'src/Common/Domain/Exceptions/Unauthorized.exception';

@QueryHandler(LoginQuery)
export class LoginImpl implements Login {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(HashService)
    private readonly hashService: HashService,
    @Inject(TokenService)
    private readonly tokenRepository: TokenService,
  ) {}
  async execute(query: LoginQuery): Promise<Tokens> {
    console.log('query: ', query);
    const email = Email.fromInput(query.email);
    const password = Password.fromInput(query.password);

    const user = await this.userRepository.loadByEmail(email);
    if (!user) throw new NotFoundException('user not found');

    const isPasswordEquals = await this.hashService.compare(
      user.password.getValue,
      password.getValue,
    );
    if (!isPasswordEquals)
      throw new UnauthorizedException('Invalid email or password');

    const accessToken = await this.tokenRepository.generateAccessToken(user);
    const refreshToken = await this.tokenRepository.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
