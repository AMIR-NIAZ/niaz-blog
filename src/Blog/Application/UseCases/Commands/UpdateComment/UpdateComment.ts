import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentCommand } from './UpdateComment.command';

export interface AddComment extends ICommandHandler<
  UpdateCommentCommand,
  void
> {}
