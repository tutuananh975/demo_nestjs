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

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
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
}
