import { AddBlogCommand } from "src/Blog/Application/UseCase/Commands/AddBlog/AddBlogCommand";

export class CreateBlogDto implements AddBlogCommand {
    title: string
    content: string
    userId: string
}