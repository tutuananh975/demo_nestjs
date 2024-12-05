import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The username of the user for authentication',
        uniqueItems: true,
    })
    username: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The password of the user for authentication',
    })
    password: string;
}
