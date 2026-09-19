import { IQueryHandler } from '@nestjs/cqrs';
import { RefreshTokenQuery } from './RefreshToken.query';

export interface RefreshToken extends IQueryHandler<
  RefreshTokenQuery,
  string
> {}
