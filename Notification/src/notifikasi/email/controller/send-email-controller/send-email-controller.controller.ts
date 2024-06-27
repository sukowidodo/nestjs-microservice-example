import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as console from 'node:console';

@Controller('send-email-controller')
export class SendEmailControllerController {
  @MessagePattern('user.created')
  email(@Payload() user: { email: string; name: string }) {
    console.log('MessagePattern', user);
  }
}
