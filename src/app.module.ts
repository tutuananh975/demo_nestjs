import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './common/configs/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
