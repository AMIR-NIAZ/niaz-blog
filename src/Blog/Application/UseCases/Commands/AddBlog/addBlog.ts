import { ICommandHandler } from '@nestjs/cqrs';
import { AddBlogCommand } from './addBlog.command';

export interface AddBlog extends ICommandHandler<AddBlogCommand, void> {}
