import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

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

  await app.listen(appPort || 3000);

  Logger.log(`🚀 Server running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
