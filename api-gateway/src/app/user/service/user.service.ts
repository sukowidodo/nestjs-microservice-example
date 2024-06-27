import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "../../auth/event/UserCreatedEvent";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private photoRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async save(user: User) {
    const userSave = await this.photoRepository.save(user);
    this.eventEmitter.emit('user.created', new UserCreatedEvent(userSave));
    return userSave;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.photoRepository.findOneByOrFail({ email: email });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        console.log('suko', err);
        throw new NotFoundException('Not Found');
      }
    }
  }

  async find(_id: number): Promise<User> {
    return this.photoRepository.findOneByOrFail({ id: _id });
  }
}
