import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { Role } from '../role/entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), RoleModule],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
