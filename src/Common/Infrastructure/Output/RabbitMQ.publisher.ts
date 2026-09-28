import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import DomainEvent from '../../Domain/DomainEvent';
import { Publisher } from '../../Application/Output/Publisher.service';

@Injectable()
export class RabbitMQPublisher implements Publisher {
  constructor(
    @Inject('RABBITMQ')
    private readonly rabbitMQ: ClientProxy,
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    await firstValueFrom(
      this.rabbitMQ.emit(event.name, {
        occurredOn: event.occurredOn,
        payload: event,
      }),
    );
  }
}
