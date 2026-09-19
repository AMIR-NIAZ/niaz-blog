import { ICommandHandler } from '@nestjs/cqrs';
import { IncrementViewCommand } from './incrementView.command';

export interface IncrementView extends ICommandHandler<
  IncrementViewCommand,
  void
> {}
