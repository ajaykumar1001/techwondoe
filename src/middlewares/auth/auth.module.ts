import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config/config';
import { CompanyModule } from 'src/resources/company/company.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: Config.JWT_SECRET_KEY,
      signOptions: { expiresIn: Config.JWT_SESSION_EXPIRY },
    }),
    forwardRef(() => CompanyModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
