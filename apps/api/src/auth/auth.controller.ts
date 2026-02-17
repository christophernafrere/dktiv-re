import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    async signup(@Body() { lastName, firstName, email, pseudo, password }) {
        return this.authService.signup(
            lastName,
            firstName,
            email,
            pseudo,
            password,
        );
    }

    @Post('login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() { email, password },
    ) {
        const { access_token } = await this.authService.login(email, password);

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        });

        return { success: true };
    }
}
