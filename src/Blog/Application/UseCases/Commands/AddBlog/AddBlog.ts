import { ICommandHandler } from '@nestjs/cqrs';
import { AddBlogCommand } from './AddBlog.command';

export interface AddBlog extends ICommandHandler<AddBlogCommand, void> {}
