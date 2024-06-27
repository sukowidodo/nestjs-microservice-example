import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

  async hash(value: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(value, saltOrRounds);
  }

  async compare(password: string, hashingPwd: string): Promise<boolean> {
    return await bcrypt.compare(password, hashingPwd);
  }
}
