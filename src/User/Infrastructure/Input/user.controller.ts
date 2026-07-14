import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCommand } from '../../Application/UseCase/Commands/register/RegisterCommand';
import { RegisterDTO } from './Dtos/ReginsterDTO';
import { EventPattern, Payload } from '@nestjs/microservices';
import { VerifyEmailCommand } from 'src/User/Application/UseCase/Commands/verifyEmail/verifyEmailCommond';
import { VerifyEmailDTO } from './Dtos/VerifyEmailDTO';
import { Tokens } from 'src/common/Application/tokens';
import { LoginDTO } from './Dtos/LoginDTO';
import { LoginQuery } from 'src/User/Application/UseCase/Queries/Login/LoginQuery';
import { RefreshTokenQuery } from 'src/User/Application/UseCase/Queries/RefreshToken/RefreshTokenQuery';

@Controller('auth')
export class UserController {
  public constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post('/register')
  public async registerNewUser(
    @Body() dto: RegisterDTO,
  ): Promise<{ message: string }> {
    await this.commandBus.execute<RegisterCommand, void>(
      new RegisterCommand(dto.username, dto.password, dto.email)
    );

    return {
      message: 'OTP sent',
    };
  }

  @Post('/verify-email')
  public async verifyEmail(
    @Body() dto: VerifyEmailDTO,
  ) {
    const { accessToken, refreshToken } = await this.commandBus.execute<VerifyEmailCommand, Tokens>(
      new VerifyEmailCommand(dto.email, dto.otp)
    );

    return {
      data: { accessToken, refreshToken },
    };
  }

  @Post('/login')
  public async login(
    @Body() dto: LoginDTO,
  ) {
    const { accessToken, refreshToken } = await this.queryBus.execute<LoginQuery, Tokens>(
      new LoginQuery(dto.email, dto.password)
    );

    return {
      data: { accessToken, refreshToken },
    };
  }

  @Get('/refresh-token')
  public async refreshToken(
    @Headers('token') token: string
  ) {
    const accessToken = await this.queryBus.execute<RefreshTokenQuery, string>(
      new RefreshTokenQuery(token)
    );

    return {
      data: { accessToken },
    };
  }

  @EventPattern('NewUserRegistered')
  async onUserRegistered(@Payload() data: any) {
    const { email, userId, otp } = data.payload;
    console.log('data=>', data);

    // await this.mailService.sendOtp( email, otp);
  }
}
