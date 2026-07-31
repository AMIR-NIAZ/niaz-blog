export class CommentResponse {
    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly userId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}