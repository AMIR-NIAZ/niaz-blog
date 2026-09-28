import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateBlogCommand } from './UpdateBlog.command';

export interface UpdateBlog extends ICommandHandler<UpdateBlogCommand, void> {}
