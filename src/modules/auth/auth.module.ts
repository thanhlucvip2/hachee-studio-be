import { Module } from '@nestjs/common';

// import { MAccountVenderModule } from '@modules/m-account-vender/m-account-vender.module';

import { AuthService } from './auth.service';
import { AuthLoginController } from './controllers/auth-login.controller';
// import { JwtStrategy } from './strategys';
// import { AuthProfileController } from './controllers/auth-profile.controller';

@Module({
  imports: [],
  controllers: [AuthLoginController],
  providers: [AuthService],
})
export class AuthModule {}
