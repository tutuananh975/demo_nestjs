import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
  @MinLength(8, { message: 'username must be more than 8 characters' })
  @MaxLength(16, { message: 'username must be less than 16 characters' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'password must be more than 8 characters' })
  @MaxLength(16, { message: 'password must be less than 16 characters' })
  password: string;
}
