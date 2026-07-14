import { UpdateBlogCommand } from "src/Blog/Application/UseCase/Commands/UpdateBlog/UpdateBlogCommand";

export class UpdateBlogDto implements UpdateBlogCommand {
    blogId: string
    title: string
    content: string
}