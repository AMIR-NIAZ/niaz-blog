import { ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './Register.command';

export interface Register extends ICommandHandler<RegisterCommand, void> {}
