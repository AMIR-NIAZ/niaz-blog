import DomainEvent from "src/common/Domain/DomainEvent";
import BlogId from "../ValueObjects/BlogId";
import UserId from "../ValueObjects/UserId";

export default class CreateNewBlog extends DomainEvent {
    constructor(
        public blogId: string,
        public userId: string
    ) {
        super()
    }

    static of(blogId: BlogId, userId: UserId) {
        return new CreateNewBlog(blogId.getValue, userId.getValue)
    }
}