import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
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
    }));

    // Using ClassSerializerInterceptor to handle serialization globally
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    });

    await app.listen(3500);
}
bootstrap();
