import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';
import { MissionService } from './mission/mission.service';
import { MissionController } from './mission/mission.controller';
import { MissionModule } from './mission/mission.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        UserModule,
        CompanyModule,
        MissionModule,
    ],
    controllers: [AppController, CompanyController, MissionController],
    providers: [AppService, CompanyService, MissionService],
})
export class AppModule {}
