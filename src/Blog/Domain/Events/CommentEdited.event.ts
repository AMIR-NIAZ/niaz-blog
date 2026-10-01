import DomainEvent from "src/Common/Domain/DomainEvent";
import BlogId from "../ValueObjects/BlogId";
import CommentId from "../ValueObjects/CommentId";
import UserId from "../ValueObjects/UserId";

export default class CommentEdited extends DomainEvent {
    constructor(public readonly commentId: string) {
        super();
    }

    static of(commentId: CommentId) {
        return new CommentEdited(commentId.getValue);
    }
}
