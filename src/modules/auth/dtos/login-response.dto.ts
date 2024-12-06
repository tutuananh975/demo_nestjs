import { User } from 'src/modules/user/user.entity';

export interface LoginResponseDto {
    accessToken: string;
    user: User;
}
