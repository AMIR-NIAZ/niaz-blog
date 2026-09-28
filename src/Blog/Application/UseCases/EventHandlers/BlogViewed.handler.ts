import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import BlogViewed from 'src/Blog/Domain/Events/BlogViewed.event';
import { IncrementViewCommand } from '../Commands/IncrementView/IncrementView.command';

@EventsHandler(BlogViewed)
export class BlogViewedHandler implements IEventHandler<BlogViewed> {
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: BlogViewed): Promise<void> {
    await this.commandBus.execute<IncrementViewCommand, void>(
      new IncrementViewCommand(event.blogId),
    );
  }
}
