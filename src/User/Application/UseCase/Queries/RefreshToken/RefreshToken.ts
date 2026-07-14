import { IQueryHandler } from '@nestjs/cqrs';
import { RefreshTokenQuery } from './RefreshTokenQuery';

export interface RefreshToken extends IQueryHandler<
  RefreshTokenQuery,
  string
> {}
