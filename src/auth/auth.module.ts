import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
