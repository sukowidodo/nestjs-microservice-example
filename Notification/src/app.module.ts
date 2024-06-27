import { Module } from '@nestjs/common';
import { SendEmailControllerController } from './notifikasi/email/controller/send-email-controller/send-email-controller.controller';

@Module({
  imports: [],
  controllers: [SendEmailControllerController],
  providers: [],
})
export class AppModule {}
