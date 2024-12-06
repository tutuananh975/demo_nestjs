import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './common/configs/config.interface';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    const configService = app.get(ConfigService);
    const appPort = configService.get<number>('APP_PORT');
    const corsEnabled = configService.get<boolean>('CORS_ENABLED');
    const apiVersion = configService.get<string>('API_VERSION');
    const swaggerConfig = configService.get<SwaggerConfig>('swagger');

    app.useGlobalPipes(new ValidationPipe());
    // set global prefix
    app.setGlobalPrefix(apiVersion);

    // Cors
    if (corsEnabled) {
        app.enableCors();
    }

    const config = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .addBearerAuth(
            {
                description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header',
            },
            'access-token',
        )
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerConfig.path, app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true,
        }
    });

    await app.listen(appPort || 3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    Logger.log(`Server enabled cors = ${corsEnabled}`, 'Bootstrap');
    Logger.log(`🚀 Server running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
