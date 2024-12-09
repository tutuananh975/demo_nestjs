import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dtos/user-register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

    async createUser(user: UserRegisterDto): Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }
}
