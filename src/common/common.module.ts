import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';

@Module({
  imports: [ConfigModule],
  exports: [ConfigModule],
})
export class CommonModule {}
