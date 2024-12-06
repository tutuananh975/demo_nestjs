import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RoleModule } from '../role/role.module';
import { Role } from '../role/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), RoleModule],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
