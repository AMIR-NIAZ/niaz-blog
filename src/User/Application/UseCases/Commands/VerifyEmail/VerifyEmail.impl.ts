import { Inject } from '@nestjs/common';
import { VerifyEmail } from './VerifyEmail';
import { VerifyEmailCommand } from './VerifyEmail.command';
import { CacheService } from 'src/Common/Application/Output/Cache.service';
import { HashService } from 'src/Common/Application/Output/Hash.service';
import { UserRepository } from 'src/User/Application/Ports/User.repository';
import Email from 'src/User/Domain/ValueObjects/Email';
import Otp from 'src/User/Domain/ValueObjects/Otp';
import { TokenService } from 'src/Common/Application/Output/Token.service';
import { CommandHandler } from '@nestjs/cqrs';
import { Tokens } from 'src/Common/Application/Tokens';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailImpl implements VerifyEmail {
  constructor(
    @Inject(CacheService)
    private readonly cacheService: CacheService,
    @Inject(HashService)
    private readonly hashService: HashService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(TokenService)
    private readonly tokenRepository: TokenService,
  ) {}
  async execute(command: VerifyEmailCommand): Promise<Tokens> {
    const email = Email.fromInput(command.email);
    const otpObject = Otp.fromInput(command.otp);

    const otp = (await this.cacheService.get(
      `email:${email.getValue}`,
    )) as string;
    if (!otp) throw new Error('otp expired');
    await this.cacheService.del(`email:${email.getValue}`);

    const isOtpEquals = await this.hashService.compare(otp, otpObject.getValue);
    if (!isOtpEquals) throw new Error('otp not eqluals');

    const user = await this.userRepository.loadByEmail(email);
    if (!user) throw new Error('user not fine');

    user.confirmEmail();

    await this.userRepository.VerifyEmail(user);

    const accessToken = await this.tokenRepository.generateAccessToken(user);
    const refreshToken = await this.tokenRepository.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
