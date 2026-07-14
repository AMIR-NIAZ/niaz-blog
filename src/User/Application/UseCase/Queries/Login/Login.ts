import { IQueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './LoginQuery';
import { Tokens } from 'src/common/Application/tokens';

export interface Login extends IQueryHandler<LoginQuery, Tokens> {}
