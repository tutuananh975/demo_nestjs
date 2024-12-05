import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dtos/user-register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { username },
            relations: { role: true },
        });
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations: { role: true },
        });
    }

    async register(payLoad: UserRegisterDto): Promise<User> {
        const foundUser = await this.findByUsername(payLoad.username);
        if (foundUser) {
            throw new BadRequestException('user is already exists!');
        }
        const salt = this.configService.get('SALT');
        const password = await bcrypt.hash(payLoad.password, Number(salt));
        const user = this.userRepository.create({ ...payLoad, password });
        return this.userRepository.save(user);
    }
}
