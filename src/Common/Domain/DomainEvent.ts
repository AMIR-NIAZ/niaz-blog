export default abstract class DomainEvent {
  readonly occurredOn: Date;
  readonly name: string = this.constructor.name;

  constructor() {
    this.occurredOn = new Date();
  }
}
