import { ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from './verifyEmailCommond';
import { Tokens } from 'src/common/Application/tokens';

export interface VerifyEmail extends ICommandHandler<
  VerifyEmailCommand,
  Tokens
> {}
