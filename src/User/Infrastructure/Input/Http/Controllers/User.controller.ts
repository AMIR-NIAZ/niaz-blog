import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCommand } from '../../../../Application/UseCases/Commands/Register/Register.command';
import { EventPattern, Payload } from '@nestjs/microservices';
import { VerifyEmailCommand } from 'src/User/Application/UseCases/Commands/VerifyEmail/VerifyEmail.command';
import { Tokens } from 'src/Common/Application/Tokens';
import { LoginQuery } from 'src/User/Application/UseCases/Queries/Login/Login.query';
import { RefreshTokenQuery } from 'src/User/Application/UseCases/Queries/RefreshToken/RefreshToken.query';
import { RegisterDto } from '../Dtos/Register.dto';
import { VerifyEmailDto } from '../Dtos/VerifyEmail.dto';
import { LoginDto } from '../Dtos/Login.dto';

@Controller('auth')
export class UserController {
  public constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/register')
  public async registerNewUser(
    @Body() dto: RegisterDto,
  ): Promise<{ message: string }> {
    await this.commandBus.execute<RegisterCommand, void>(
      new RegisterCommand(dto.username, dto.password, dto.email),
    );

    return {
      message: 'OTP sent',
    };
  }

  @Post('/verify-email')
  public async verifyEmail(@Body() dto: VerifyEmailDto) {
    const { accessToken, refreshToken } = await this.commandBus.execute<
      VerifyEmailCommand,
      Tokens
    >(new VerifyEmailCommand(dto.email, dto.otp));

    return {
      data: { accessToken, refreshToken },
    };
  }

  @Post('/login')
  public async login(@Body() dto: LoginDto) {
    const { accessToken, refreshToken } = await this.queryBus.execute<
      LoginQuery,
      Tokens
    >(new LoginQuery(dto.email, dto.password));

    return {
      data: { accessToken, refreshToken },
    };
  }

  @Get('/refresh-token')
  public async refreshToken(@Headers('token') token: string) {
    const accessToken = await this.queryBus.execute<RefreshTokenQuery, string>(
      new RefreshTokenQuery(token),
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
