import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteBlogCommand } from './DeleteBlog.command';

export interface DeleteBlog extends ICommandHandler<DeleteBlogCommand, void> {}
