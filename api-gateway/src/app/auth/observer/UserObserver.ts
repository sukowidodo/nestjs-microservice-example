import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { UserCreatedEvent } from '../event/UserCreatedEvent';
import { OnEvent } from '@nestjs/event-emitter';
import {ClientKafka} from '@nestjs/microservices';
import * as console from "node:console";

@Injectable()
export class UserObserver implements OnModuleInit{
  constructor(
    @Inject('NOTIFICATION_MODULE')
    private readonly client: ClientKafka,
  ) {}
  @OnEvent(`user.created`)
  userCreated(userCreatedEvent: UserCreatedEvent) {
    const test= this.client.send('user.created', {
      name: userCreatedEvent.user.name,
      email: userCreatedEvent.user.email,
    });
  }

  onModuleInit(): any {
    this.client.subscribeToResponseOf('user.created');
  }
}