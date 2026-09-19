import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateBlogCommand } from './updateBlog.command';

export interface UpdateBlog extends ICommandHandler<UpdateBlogCommand, void> {}
