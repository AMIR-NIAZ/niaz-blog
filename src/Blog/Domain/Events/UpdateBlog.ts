import DomainEvent from "src/common/Domain/DomainEvent";
import Blog from "../Blog";

export default class UpdateBlog extends DomainEvent {
    constructor(
        public readonly blogId: string
    ) {
        super()
    }

    static of(blog: Blog) {
        return new UpdateBlog(blog.id.getValue)
    }
}
