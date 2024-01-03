import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/feature/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{
        expiresIn:"1h",
      }
    }),

    forwardRef(() => UserModule),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, CryptoUtil,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
  login(user: any): import("../../feature/user/user.controller").UserController {
    throw new Error('Method not implemented.');
  }
}