import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseSuccessInterface } from '@model/response-success.interface';

// import { ResponseSuccessInterface } from '@utils/interfaces';
// import { MAccountVenderService } from '@modules/m-account-vender/m-account-vender.service';
import { API_PREFIX_PATH } from '@configs/app.config';

import { AuthService } from '../auth.service';
import { AuthLoginDTO } from '../dto';

@Controller(API_PREFIX_PATH + '/auth')
export class AuthLoginController {
  constructor(
    private readonly authService: AuthService, // private readonly mAccountVenderService: MAccountVenderService,
  ) {}

  @ApiBearerAuth('token')
  @ApiTags('Auth')
  @ApiCreatedResponse({ description: 'Login-success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDTO, @Res() res: Response) {
    let httpStatusCode = HttpStatus.OK;
    const resData: ResponseSuccessInterface = {
      statusCode: httpStatusCode,
      success: 'login-success',
      data: null,
    };

    try {
      const accountDB = {
        id: 1,
        ...authLoginDto,
      };
      if (accountDB === null) {
        httpStatusCode = HttpStatus.UNAUTHORIZED;
        throw new HttpException('unauthorized', httpStatusCode);
      }

      // const checkPasswordHash = this.authService.comparePassword(
      //   authLoginDto.password,
      //   accountDB.password,
      // );
      // if (!checkPasswordHash) {
      //   httpStatusCode = HttpStatus.UNAUTHORIZED;
      //   throw new HttpException('unauthorized', httpStatusCode);
      // }

      const token = await this.authService.createTokenAndRefreshToken(
        accountDB.id,
      );

      assign(resData, {
        data: {
          token,
        },
      });
    } catch (error) {
      httpStatusCode =
        httpStatusCode === HttpStatus.OK
          ? HttpStatus.INTERNAL_SERVER_ERROR
          : httpStatusCode;
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }
}
