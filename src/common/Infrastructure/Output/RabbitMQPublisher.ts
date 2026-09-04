import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import DomainEvent from '../../Domain/DomainEvent';
import { Publisher } from '../../Application/Output/Publisher';

@Injectable()
export class RabbitMQPublisher implements Publisher {
  constructor(
    @Inject('RABBITMQ')
    private readonly rabbitMQ: ClientProxy,
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    this.rabbitMQ.emit(event.name, {
      occurredOn: event.occurredOn,
      payload: event,
    });
  }
}