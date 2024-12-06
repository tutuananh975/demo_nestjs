import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { APIResponse } from 'src/shared/interfaces/api-response';
import { User } from '../entities/user.entity';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/role/enums/user-role';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('list')
    @Roles(UserRole.Admin)
    @ApiOkResponse({
        description: 'Return all roles',
    })
    @ApiBearerAuth('access-token')
    async findAllUsers(
        @Res() res: Response<APIResponse<User[]>>,
        @CurrentUser() user: User | null,
    ) {
        const users = await this.userService.findAll();
        console.log(user);
        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Find all users success',
            data: users.map((user) => plainToInstance(User, user)),
        });
    }
}
