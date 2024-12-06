import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dtos/login-response.dto';
import { UserRegisterDto } from 'src/modules/user/dtos/user-register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findByUsername(username);

        if (!user) {
            throw new NotFoundException('Username is not found');
        }
        await this.verifyPassword(password, user.password);
        delete user.password;

        return user;
    }

    private async verifyPassword(password, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(
            password,
            hashedPassword,
        );
        if (!isPasswordMatching) {
            throw new BadRequestException('Password is incorect');
        }
    }

    async login(user: User): Promise<LoginResponseDto> {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
            user,
        };
    }

    async register(payLoad: UserRegisterDto): Promise<User> {
        const foundUser = await this.userService.findByUsername(
            payLoad.username,
        );
        if (foundUser) {
            throw new BadRequestException('user is already exists!');
        }
        const salt = this.configService.get('SALT');
        const password = await bcrypt.hash(payLoad.password, Number(salt));
        return this.userService.createUser({ ...payLoad, password });
    }
}
