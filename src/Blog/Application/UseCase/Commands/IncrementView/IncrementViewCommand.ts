import BlogId from "src/Blog/Domain/ValueObjects/BlogId";

export class IncrementViewCommand {
    constructor(
        public readonly blogId: string,
    ) {}
}
