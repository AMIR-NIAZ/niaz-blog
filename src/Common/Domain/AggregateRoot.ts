import DomainEvent from './DomainEvent';
import Entity from './Entity';

export default abstract class AggregateRoot extends Entity {
  private events: Set<DomainEvent> = new Set();

  protected addEvent(event: DomainEvent): void {
    this.events.add(event);
  }

  public clearEvent(): void {
    this.events.clear();
  }

  public getEvents(): Set<DomainEvent> {
    return this.events;
  }
}
