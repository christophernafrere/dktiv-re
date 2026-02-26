import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const corsOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
        : ['http://localhost:3000', 'http://127.0.0.1:3000'];

    app.enableCors({
        origin: corsOrigins,
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
