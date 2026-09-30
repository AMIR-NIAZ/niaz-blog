import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Payload } from 'src/Common/Application/Payload';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: Payload }>();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.sub;
  },
);
