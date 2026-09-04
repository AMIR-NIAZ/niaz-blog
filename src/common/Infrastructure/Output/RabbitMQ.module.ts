import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMQPublisher } from './RabbitMQPublisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_USERNAME || 'guest'}:${process.env.RABBITMQ_PASSWORD || 'guest'}@${process.env.RABBITMQ_HOST || 'rabbitmq'}:${process.env.RABBITMQ_PORT || 5672}`,
          ],

          queue: process.env.RABBITMQ_QUEUE || 'niaz-blog',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],

  providers: [RabbitMQPublisher],

  exports: [RabbitMQPublisher, ClientsModule],
})
export class RabbitMQModule {}