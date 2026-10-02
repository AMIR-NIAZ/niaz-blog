import { Payload } from "src/Common/Application/Payload";

export class UpdateBlogCommand {
  constructor(
    public readonly blogId: string,
    public readonly title: string,
    public readonly content: string,
    public readonly user: Payload,
  ) {}
}
