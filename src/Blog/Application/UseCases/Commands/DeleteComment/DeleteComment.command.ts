export class DeleteCommentCommand {
  constructor(
    public readonly blogId: string,
    public readonly commentId: string,
    public readonly userId: string,
  ) {}
}
