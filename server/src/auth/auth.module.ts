import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, PasswordService, CookieService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
