import { CommentResponse } from "./CommentResponse";

export default class BlogResponse {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly content: string,
        public readonly userId: string,
        public readonly viewCount: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly comments: CommentResponse[],
    ) {}
}

