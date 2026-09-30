export class AddCommentCommand {
  constructor(
    public readonly text: string,
    public readonly blogId: string,
    public readonly senderId: string,
  ) {}
}
