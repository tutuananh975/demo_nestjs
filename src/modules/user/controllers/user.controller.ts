import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { APIResponse } from 'src/common/interfaces/api-response';
import { User } from '../entities/user.entity';
import { Response } from 'express';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { plainToInstance } from 'class-transformer';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/role/enums/user-role';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('list')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    @ApiOkResponse({
        description: 'Return all roles',
    })
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

    @Post('register')
    @ApiCreatedResponse({
        description: 'Create user Success',
    })
    @ApiBadRequestResponse({
        description: 'Create User failed',
    })
    async register(
        @Body() payload: UserRegisterDto,
        @Res() res: Response<APIResponse<User>>,
    ) {
        const user = await this.userService.register(payload);

        res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'Create user Success',
            data: plainToInstance(User, user),
        });
    }
}
