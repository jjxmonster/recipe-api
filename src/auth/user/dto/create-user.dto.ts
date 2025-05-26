import { IsString, IsEmail, MinLength } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Match<CreateUserDto>('password')
  confirmPassword: string;
}
