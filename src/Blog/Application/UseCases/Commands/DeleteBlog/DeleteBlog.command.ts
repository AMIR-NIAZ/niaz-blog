import { Payload } from "src/Common/Application/Payload";

export class DeleteBlogCommand {
  constructor(
    public readonly blogId: string,
    public readonly user: Payload,
  ) {}
}
