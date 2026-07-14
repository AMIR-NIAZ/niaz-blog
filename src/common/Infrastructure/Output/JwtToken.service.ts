import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../../Application/payload';
import { TokenService } from '../../Application/Output/TokenService';
import User from 'src/User/Domain/User';

@Injectable()
export class JwtAppService implements TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyAccessToken(token: string): Promise<Payload> {
    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        ignoreExpiration: false,
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id.getValue,
      role: user.role.getValue,
    } as Payload;
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '1h',
    });
  }

  async verfiyRefreshToken(token: string): Promise<Payload> {
    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        ignoreExpiration: false,
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      sub: user.id.getValue,
      role: user.role.getValue,
    } as Payload;

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '30d',
    });
  }
}
