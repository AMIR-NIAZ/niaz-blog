import DomainEvent from "src/common/Domain/DomainEvent";
import Blog from "../Blog";

export default class BlogViewedEvent extends DomainEvent {
    constructor(
        public readonly blogId: string
    ) {
        super()
    }

    static of(blog: Blog) {
        return new BlogViewedEvent(blog.id.getValue)
    }
}
