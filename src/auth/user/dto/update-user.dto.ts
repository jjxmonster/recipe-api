import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
