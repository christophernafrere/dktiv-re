import { Injectable } from '@nestjs/common';
import { User } from '@dktiv/db';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(
        lastName: string,
        firstName: string,
        pseudo: string,
        email: string,
        password: string,
    ) {
        try {
            const newUser = await this.prisma.user.create({
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
            throw new Error('Internal Server Error');
        }
    }

    async getUsers() {
        try {
            const users = await this.prisma.user.findMany();

            return users;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });

            if (!user) {
                throw new Error('No user founded');
            } else {
                return user;
            }
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error('No user founded');
            } else {
                return user;
            }
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async userCheck(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                },
                select: {
                    email: true,
                    password: true,
                },
            });

            return user;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
}
