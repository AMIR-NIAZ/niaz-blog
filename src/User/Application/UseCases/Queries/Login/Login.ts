import { IQueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './Login.query';
import { Tokens } from 'src/Common/Application/Tokens';

export interface Login extends IQueryHandler<LoginQuery, Tokens> {}
