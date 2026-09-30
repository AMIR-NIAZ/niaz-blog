import { ICommandHandler } from '@nestjs/cqrs';
import { AddCommentCommand } from './AddComment.command';

export interface AddComment extends ICommandHandler<AddCommentCommand, void> {}
