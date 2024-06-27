import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { LoginDto } from '../dto/LoginDto';
import { AuthService } from '../service/auth.service';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterDto } from '../dto/RegisterDto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiConflictResponse({
    description: 'User already exists',
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register({
      email: registerDto.email,
      password: registerDto.password,
      avatar: registerDto.avatar,
      name: registerDto.name,
    });
  }
}
