import { ICommandHandler } from "@nestjs/cqrs";
import { AddBlogCommand } from "./AddBlogCommand";

export interface AddBlog extends ICommandHandler<AddBlogCommand, void> {}