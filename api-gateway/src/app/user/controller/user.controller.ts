import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guard/auth-guard';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get('user')
  user(@Req() req) {
    return this.userService.find(req.user.id);
  }
}
