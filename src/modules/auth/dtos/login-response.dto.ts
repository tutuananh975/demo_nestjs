import { User } from 'src/modules/user/entities/user.entity';

export interface LoginResponseDto {
    accessToken: string;
    user: User;
}
