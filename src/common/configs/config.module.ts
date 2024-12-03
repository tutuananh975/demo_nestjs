import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',
      ],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
