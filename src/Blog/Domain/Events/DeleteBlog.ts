import DomainEvent from "src/common/Domain/DomainEvent";
import Blog from "../Blog";

export default class DeleteBlog extends DomainEvent {
    constructor(
        public readonly blogId: string
    ) {
        super()
    }

    static of(blog: Blog) {
        return new DeleteBlog(blog.id.getValue)
    }
}
