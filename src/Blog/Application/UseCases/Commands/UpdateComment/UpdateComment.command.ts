export class UpdateCommentCommand {
  constructor(
    public readonly text: string,
    public readonly blogId: string,
    public readonly commentId: string,
    public readonly userId: string
  ) {}
}
