import { prisma } from '@dktiv/db';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MissionService {
    async createMission(
        name: string,
        maxUser: number,
        category: string,
        companyId: string,
        date: Date,
        location: string,
        imageUrl: string,
    ) {
        try {
            const newMission = await prisma.mission.create({
                data: {
                    name,
                    maxUser,
                    category,
                    date,
                    imageUrl,
                    location,
                    company: {
                        connect: {
                            id: companyId,
                        },
                    },
                },
                select: {
                    name: true,
                    maxUser: true,
                    category: true,
                    date: true,
                    imageUrl: true,
                    location: true,
                    company: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            return newMission;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getAllMission() {
        try {
            const missions = await prisma.mission.findMany({
                select: {
                    name: true,
                    maxUser: true,
                    category: true,
                    date: true,
                    imageUrl: true,
                    location: true,
                    company: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            return missions;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getMissionById(id: string) {
        try {
            const missions = await prisma.mission.findUnique({
                where: { id },
                select: {
                    name: true,
                    maxUser: true,
                    category: true,
                    date: true,
                    imageUrl: true,
                    location: true,
                    company: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            return missions;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getMissionsByUser(userId: string) {
        console.log('getMissionsByUser');
        try {
            const missions = await prisma.mission.findMany({
                where: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
                select: {
                    name: true,
                    maxUser: true,
                    category: true,
                    date: true,
                    imageUrl: true,
                    location: true,
                    company: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            console.log(missions);

            return missions;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async addUserToMission(userId: string, missionId: string) {
        const mission = await prisma.mission.update({
            where: {
                id: missionId,
            },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return mission;
    }

    async addFeedbackToMission(
        userId: string,
        missionId: string,
        rate: number,
    ) {
        const mission = await prisma.mission.update({
            where: {
                id: missionId,
            },
            data: {
                feedback: {
                    create: {
                        rate,
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                },
            },
        });

        return mission;
    }
}
