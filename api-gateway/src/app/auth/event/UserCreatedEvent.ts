import { User } from '../../user/entity/user';

export class UserCreatedEvent {
  public user: User;
  constructor(user: User) {
    this.user = user;
  }
}
