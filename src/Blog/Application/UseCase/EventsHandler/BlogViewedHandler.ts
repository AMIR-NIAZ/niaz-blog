import { CommandBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import BlogViewedEvent from "src/Blog/Domain/Events/BlogViewedEvent";
import { IncrementViewCommand } from "../Commands/IncrementView/IncrementViewCommand";

@EventsHandler(BlogViewedEvent)
export class BlogViewedHandler
    implements IEventHandler<BlogViewedEvent> {

    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    async handle(event: BlogViewedEvent): Promise<void> {
        await this.commandBus.execute<IncrementViewCommand, void>(
            new IncrementViewCommand(event.blogId),
        );
    }
}
