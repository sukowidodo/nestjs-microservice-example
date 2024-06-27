import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from '../../user/service/user.service';
import { LoginDto } from '../dto/LoginDto';
import { RegisterDto } from '../dto/RegisterDto';
import { User } from '../../user/entity/user';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user: User = await this.userService.findByEmail(loginDto.email);
    await this.bcryptService.compare(loginDto.password, user.password);
    const token = await this.jwtService.signAsync({ id: user.id });
    return { token: token };
  }

  async register(registerDto: RegisterDto) {
    const pass = await this.bcryptService.hash(registerDto.password);
    const user = await this.userService.save({
      name: registerDto.name,
      email: registerDto.email,
      password: pass,
      avatar: registerDto.avatar,
    });
    return user;
  }
}
