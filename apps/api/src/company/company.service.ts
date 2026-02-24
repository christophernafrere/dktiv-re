import { prisma } from '@dktiv/db';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CompanyService {
    async createCompany(
        name: string,
        logoUrl: string,
        description: string,
        userId: string,
    ) {
        const newUser = await prisma.company.create({
            data: {
                name,
                description,
                logoUrl,
                manager: {
                    connect: {
                        id: userId,
                    },
                },
            },
            select: {
                name: true,
                description: true,
                logoUrl: true,
                manager: {
                    select: {
                        pseudo: true,
                        email: true,
                    },
                },
            },
        });

        return newUser;
    }

    async getCompanyById(id: string) {
        const company = await prisma.company.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                description: true,
                logoUrl: true,
                manager: {
                    select: {
                        pseudo: true,
                        email: true,
                    },
                },
            },
        });

        return company;
    }

    async deleteCompany(id: string) {
        const company = await prisma.company.delete({
            where: {
                id,
            },
        });

        return company;
    }
}
