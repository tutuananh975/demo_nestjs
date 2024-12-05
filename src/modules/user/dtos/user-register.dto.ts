import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
    @MinLength(8, { message: 'username must be more than 8 characters' })
    @MaxLength(16, { message: 'username must be less than 16 characters' })
    @IsNotEmpty({ message: 'username is required' })
    @ApiProperty({
        type: String,
        description: 'The username of the user',
        minimum: 8,
        maximum: 16,
    })
    username: string;

    @IsNotEmpty({ message: 'password is required' })
    @MinLength(8, { message: 'password must be more than 8 characters' })
    @MaxLength(16, { message: 'password must be less than 16 characters' })
    @ApiProperty({
        type: String,
        description: 'The password of the user',
        minimum: 8,
        maximum: 16,
    })
    password: string;
}
