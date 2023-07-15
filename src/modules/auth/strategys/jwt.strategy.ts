import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { JWT_SECRET_KEY } from '@configs/app.config';
// import { MAccountVenderEntity } from '@modules/m-account-vender/m-account-vender.entity';
// import { MAccountVenderService } from '@modules/m-account-vender/m-account-vender.service';
import { LoggedInterface } from '@modules/auth/utils/logged.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const id = payload?.id;
    // const accountDB: MAccountVenderEntity =
    //   await this.mAccountVenderService.findOneByIdMokuEnable(id);
    const accountDB = {
      id,
      email: 'email',
      username: 'username',
      role: 'admin',
    };
    if (!accountDB) {
      return done(new UnauthorizedException('unauthorized-access'), false);
    }

    const data: LoggedInterface = {
      id,
      email: accountDB.email,
      username: accountDB.username,
      role: accountDB.role,
    };

    return done(null, data);
  }
}
