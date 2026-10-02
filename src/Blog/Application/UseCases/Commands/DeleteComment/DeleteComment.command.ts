import { Payload } from "src/Common/Application/Payload";

export class DeleteCommentCommand {
  constructor(
    public readonly blogId: string,
    public readonly commentId: string,
    public readonly user: Payload,
  ) {}
}
