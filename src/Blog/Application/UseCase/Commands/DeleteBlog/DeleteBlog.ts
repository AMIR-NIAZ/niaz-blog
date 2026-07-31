import { ICommandHandler } from "@nestjs/cqrs";
import { DeleteBlogCommand } from "./DeleteBlogCommand";

export interface DeleteBlog extends ICommandHandler<DeleteBlogCommand, void> {}