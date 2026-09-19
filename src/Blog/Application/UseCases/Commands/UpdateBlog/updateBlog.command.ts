export class UpdateBlogCommand {
  constructor(
    public readonly blogId: string,
    public readonly title: string,
    public readonly content: string,
  ) {}
}
