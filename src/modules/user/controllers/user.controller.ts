import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { APIResponse } from 'src/common/interfaces/api-response';
import { User } from '../entities/user.entity';
import { Response } from 'express';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @ApiOkResponse({
    description: 'Return all roles'
  })
  async findAllUsers(@Res() res: Response<APIResponse<User[]>>) {
    const users = await this.userService.findAll();

    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Find all users',
      data: users.map(user => plainToInstance(User, user)),
    });
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Create user Success'
  })
  @ApiBadRequestResponse({
    description: 'Create User failed'
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
