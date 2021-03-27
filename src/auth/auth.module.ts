import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../routes/user/user.module'

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

import { jwtConstants } from './constants';

 @Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[AuthService,JwtModule]
})
export class AuthModule { }
