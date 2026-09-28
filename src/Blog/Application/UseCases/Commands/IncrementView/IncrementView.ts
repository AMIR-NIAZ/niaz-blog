import { ICommandHandler } from '@nestjs/cqrs';
import { IncrementViewCommand } from './IncrementView.command';

export interface IncrementView extends ICommandHandler<
  IncrementViewCommand,
  void
> {}
