import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { RequestWithUser } from '../intefaces/request-with-user.interface';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { APIResponse } from 'src/common/interfaces/api-response';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserRegisterDto } from 'src/modules/user/dtos/user-register.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Body() loginDto: LoginRequestDto,
        @Req() req: RequestWithUser,
        @Res() res: Response<APIResponse<LoginResponseDto>>,
    ) {
        const result = await this.authService.login(req.user);
        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'login success',
            data: result,
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
        const user = await this.authService.register(payload);

        res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'Create user Success',
            data: plainToInstance(User, user),
        });
    }
}
