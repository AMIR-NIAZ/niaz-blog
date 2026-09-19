import { IQueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './Login.query';
import { Tokens } from 'src/common/Application/Tokens';

export interface Login extends IQueryHandler<LoginQuery, Tokens> {}
