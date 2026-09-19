import DomainEvent from '../../Domain/DomainEvent';

export const Publisher = Symbol('Publisher');

export interface Publisher {
  publish(event: DomainEvent): Promise<void>;
}
