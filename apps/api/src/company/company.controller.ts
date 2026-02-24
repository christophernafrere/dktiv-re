import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.gard';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCompany(@Req() req, @Body() { name, description, logoUrl }) {
        const newCompany = await this.companyService.createCompany(
            name,
            description,
            logoUrl,
            req.user.id,
        );

        return newCompany;
    }
}
