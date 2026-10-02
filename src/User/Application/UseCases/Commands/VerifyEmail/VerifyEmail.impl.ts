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
import { InValidOperationException } from 'src/Common/Domain/Exceptions/InvalidOperation.exception';
import NotValidInputException from 'src/Common/Domain/Exceptions/NotValidInput.exception';
import NotFoundException from 'src/Common/Domain/Exceptions/NotFound.exception';

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
    const key = `email:${email.getValue}`;

    const hashedOtp = (await this.cacheService.get(key)) as string | null;
    if (!hashedOtp) throw new InValidOperationException('OTP has expired');

    const isOtpValid = await this.hashService.compare(
      hashedOtp,
      otpObject.getValue,
    );
    if (!isOtpValid) throw new NotValidInputException('OTP is incorrect');

    const user = await this.userRepository.loadByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    user.confirmEmail();
    await this.userRepository.VerifyEmail(user);
    await this.cacheService.del(key);

    const accessToken = await this.tokenRepository.generateAccessToken(user);
    const refreshToken = await this.tokenRepository.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
