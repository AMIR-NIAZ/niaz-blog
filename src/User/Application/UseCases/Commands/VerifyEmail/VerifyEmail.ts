import { ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from './VerifyEmail.commond';
import { Tokens } from 'src/common/Application/Tokens';

export interface VerifyEmail extends ICommandHandler<
  VerifyEmailCommand,
  Tokens
> {}
