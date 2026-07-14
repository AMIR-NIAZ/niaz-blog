export class AddBlogCommand {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string,
  ) {}
}
