import { ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from './VerifyEmail.command';
import { Tokens } from 'src/Common/Application/Tokens';

export interface VerifyEmail extends ICommandHandler<
  VerifyEmailCommand,
  Tokens
> {}
