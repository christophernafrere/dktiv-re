import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.gard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req) {
        const { email, id } = req.user;
        console.log({ email, id });
        return this.userService.getUserById(id);
    }
}
