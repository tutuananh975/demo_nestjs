import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    // set global prefix
    app.setGlobalPrefix('api/v1');

    const configService = app.get(ConfigService);
    const appPort = configService.get<number>('APP_PORT');
    const corsEnabled = configService.get<boolean>('CORS_ENABLED');

    // Cors
    if (corsEnabled) {
        app.enableCors();
    }
    Logger.log(`Server enabled cors = ${corsEnabled}`, 'Bootstrap');

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(appPort || 3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    Logger.log(`🚀 Server running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
