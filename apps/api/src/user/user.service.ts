import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma } from '@dktiv/db';

@Injectable()
export class UserService {
    constructor() {}

    async createUser(
        lastName: string,
        firstName: string,
        pseudo: string,
        email: string,
        password: string,
    ) {
        try {
            const newUser = await prisma.user.create({
                data: {
                    lastName,
                    firstName,
                    pseudo,
                    email,
                    password,
                },
                select: {
                    lastName: true,
                    firstName: true,
                    pseudo: true,
                    email: true,
                },
            });

            return newUser;
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUsers() {
        try {
            return await prisma.user.findMany();
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUserById(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });

            return user;
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            return user;
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async userCheck(email: string) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email,
                },
                select: {
                    email: true,
                    password: true,
                },
            });
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
