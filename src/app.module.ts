import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './common/configs/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule,
        UserModule,
        AuthModule,
        RoleModule,
        MailModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
