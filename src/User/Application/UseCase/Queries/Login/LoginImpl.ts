import { QueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './LoginQuery';
import { Login } from './Login';
import { Tokens } from 'src/common/Application/tokens';
import Email from 'src/User/Domain/ValueObjects/Email';
import { UserRepository } from 'src/User/Application/Output/UserRepsitory';
import { Inject } from '@nestjs/common';
import { HashService } from 'src/common/Application/Output/HashService';
import { TokenService } from 'src/common/Application/Output/TokenService';
import Password from 'src/User/Domain/ValueObjects/Password';

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
    if (!user) throw new Error();

    const isPasswordEquals = await this.hashService.compare(
      user.password.getValue,
      password.getValue,
    );
    if (!isPasswordEquals) throw new Error();

    const accessToken = await this.tokenRepository.generateAccessToken(user);
    const refreshToken = await this.tokenRepository.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
