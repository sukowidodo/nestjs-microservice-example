import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v4 as uuidv4 } from 'uuid';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-${uuidv4()}`,
          brokers: ['127.0.0.1:29092'],
        },
        consumer: {
          groupId: 'kafka-microservices',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
