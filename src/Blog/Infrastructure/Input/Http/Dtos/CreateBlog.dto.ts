import { AddBlogCommand } from 'src/Blog/Application/UseCases/Commands/AddBlog/AddBlog.command';

export class CreateBlogDto implements AddBlogCommand {
  title: string;
  content: string;
  userId: string;
}
