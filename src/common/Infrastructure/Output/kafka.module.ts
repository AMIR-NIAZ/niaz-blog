import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaPublisher } from './KafkaPublisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
            brokers: (process.env.KAFKA_BROKER || 'localhost:9092').split(','),
          },
          consumer: {
            groupId: process.env.KAFKA_GROUP_ID || 'my-app-consumer',
          },
        },
      },
    ]),
  ],
  providers: [KafkaPublisher],
  exports: [KafkaPublisher, ClientsModule],
})
export class KafkaModule {}
