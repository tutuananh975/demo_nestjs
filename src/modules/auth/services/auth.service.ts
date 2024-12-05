import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
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
}
