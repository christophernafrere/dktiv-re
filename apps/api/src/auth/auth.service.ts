import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async signup(
        lastName: string,
        firstName: string,
        pseudo: string,
        email: string,
        password: string,
    ) {
        try {
            const userCheck = await this.userService.userCheck(email);

            if (userCheck) {
                throw new HttpException(
                    'There is always a user with this email',
                    HttpStatus.CONFLICT,
                );
            } else {
                const hashedPassword = await hash(password, 10);
                try {
                    const newUser = await this.userService.createUser(
                        lastName,
                        firstName,
                        pseudo,
                        email,
                        hashedPassword,
                    );

                    return newUser;
                } catch (error) {
                    throw new HttpException(
                        'Internal Server Error',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            }
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await this.userService.getUserByEmail(email);

            if (!user)
                throw new HttpException(
                    'Email or password invalid',
                    HttpStatus.NOT_FOUND,
                );

            try {
                const passwordIsValid = await compare(password, user.password);

                if (!passwordIsValid)
                    throw new HttpException(
                        'Email or password invalid',
                        HttpStatus.NOT_FOUND,
                    );

                const payload = { sub: user.id };

                const access_token = await this.jwtService.signAsync(payload);

                return { access_token };
            } catch (error) {
                throw new HttpException(
                    'Internal Server Error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
