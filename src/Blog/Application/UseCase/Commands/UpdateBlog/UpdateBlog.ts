import { ICommandHandler } from "@nestjs/cqrs";
import { UpdateBlogCommand } from "./UpdateBlogCommand";

export interface UpdateBlog extends ICommandHandler<UpdateBlogCommand, void> {}