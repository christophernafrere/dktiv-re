import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import type { CookieOptions } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    async signup(@Body() { lastName, firstName, email, pseudo, password }) {
        return this.authService.signup(
            lastName,
            firstName,
            pseudo,
            email,
            password,
        );
    }

    @Post('login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() { email, password },
    ) {
        const { access_token } = await this.authService.login(email, password);

        const cookieSameSite =
            (process.env.COOKIE_SAME_SITE as
                | CookieOptions['sameSite']
                | undefined) ?? 'none';
        const cookieSecure =
            process.env.COOKIE_SECURE === undefined
                ? true
                : process.env.COOKIE_SECURE === 'true';
        const cookieMaxAge = Number(process.env.COOKIE_MAX_AGE_MS ?? 900000);

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: cookieSecure,
            sameSite: cookieSameSite,
            maxAge: Number.isNaN(cookieMaxAge) ? 900000 : cookieMaxAge,
            path: '/',
        };

        if (process.env.COOKIE_DOMAIN) {
            cookieOptions.domain = process.env.COOKIE_DOMAIN;
        }

        res.cookie('access_token', access_token, cookieOptions);

        return { success: true };
    }
}
