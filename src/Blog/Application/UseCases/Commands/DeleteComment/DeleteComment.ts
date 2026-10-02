import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommentCommand } from './DeleteComment.command';

export interface DeleteComment extends ICommandHandler<DeleteCommentCommand, void> {}
