import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteBlogCommand } from './deleteBlog.command';

export interface DeleteBlog extends ICommandHandler<DeleteBlogCommand, void> {}
