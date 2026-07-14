import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import DomainEvent from '../../Domain/DomainEvent';
import { Publisher } from '../../Application/Output/Publisher';

@Injectable()
export class KafkaPublisher implements Publisher, OnModuleInit {
  constructor(
    @Inject('KAFKA')
    private readonly kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  async publish(event: DomainEvent): Promise<void> {
    this.kafka.emit(event.name, {
      occurredOn: event.occurredOn,

      payload: event,
    });
  }
}
