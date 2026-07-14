import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../../Application/Output/TokenService';

@Injectable()
export class PayloadGuard implements CanActivate {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const Http = context.switchToHttp();
    const request = Http.getRequest<Request>();
    const token = this.getToken(request);

    try {
      const payload = await this.tokenService.verifyAccessToken(token);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(`token not valid ${error}`);
    }

    return true;
  }

  private getToken(request: Request) {
    const authHeader: string | null = request.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('token not valid');
    }
    const token = authHeader.split(' ')[1];

    return token;
  }
}
