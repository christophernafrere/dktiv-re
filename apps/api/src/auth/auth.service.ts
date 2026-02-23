import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
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
        const userCheck = await this.userService.userCheck(email);

        if (userCheck) {
            throw new HttpException(
                'There is always a user with this email',
                HttpStatus.CONFLICT,
            );
        }
        const hashedPassword = await hash(password, 10);
        return await this.userService.createUser(
            lastName,
            firstName,
            pseudo,
            email,
            hashedPassword,
        );
    }

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new HttpException(
                'Invalid email or password',
                HttpStatus.UNAUTHORIZED,
            );
        } else {
            const passwordIsValid = await compare(password, user.password);

            if (!passwordIsValid) {
                throw new HttpException(
                    'Invalid email or password',
                    HttpStatus.UNAUTHORIZED,
                );
            }

            const payload = { sub: user.id };
            const access_token = await this.jwtService.signAsync(payload);

            return { access_token };
        }
    }
}
