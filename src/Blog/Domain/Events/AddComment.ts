import DomainEvent from "src/common/Domain/DomainEvent";
import CommentId from "../ValueObjects/CommentId";
import Comment from "../Comment";

export default class AddComment extends DomainEvent {
    constructor(
        public readonly commentId: string
    ) {
        super()
    }

    static of(comment: Comment) {
        return new AddComment(comment.id.getValue)
    }
}