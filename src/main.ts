import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // setting 'api' endpoint route prefix => localhost:3000/api/endpoint
    app.setGlobalPrefix('api');

    app.useGlobalPipes(new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }))

    app.enableCors();

    await app.listen(3500);
}
bootstrap();
