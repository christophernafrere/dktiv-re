import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.gard';
import { MissionService } from './mission.service';

@Controller('mission')
export class MissionController {
    constructor(private readonly missionService: MissionService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createMission(
        @Body()
        { name, maxUser, category, companyId, date, location, imageUrl },
    ) {
        const newCompany = await this.missionService.createMission(
            name,
            maxUser,
            category,
            companyId,
            date,
            location,
            imageUrl,
        );

        return newCompany;
    }

    @Get()
    async getAllMissions() {
        const missions = await this.missionService.getAllMission();

        return missions;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getMyMissions(@Req() req) {
        const mission = await this.missionService.getMissionsByUser(
            req.user.id,
        );
        console.log('prout');
        return mission;
    }

    @Get(':id')
    async getMissionById(@Param('id') id: string) {
        const mission = await this.missionService.getMissionById(id);

        return mission;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/subscribe')
    async subscribeToMission(@Req() req, @Param('id') id: string) {
        const mission = await this.missionService.addUserToMission(
            req.user.id,
            id,
        );

        return {
            mission,
            success: true,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/feedback')
    async addFeedback(
        @Req() req,
        @Param('id') missionId: string,
        @Body() { rate },
    ) {
        const mission = await this.missionService.addFeedbackToMission(
            req.user.id,
            missionId,
            rate,
        );

        return mission;
    }
}
