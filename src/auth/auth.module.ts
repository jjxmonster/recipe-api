import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_TOKEN'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_SECRET')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
