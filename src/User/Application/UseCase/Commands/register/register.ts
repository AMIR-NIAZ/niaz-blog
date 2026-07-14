import { ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './RegisterCommand';

export interface Register extends ICommandHandler<RegisterCommand, void> {}
