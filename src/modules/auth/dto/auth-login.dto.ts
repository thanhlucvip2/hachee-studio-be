import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDTO {
  @ApiProperty({
    example: 'nishino@icd.co.jp',
  })
  @IsNotEmpty({ message: 'email-empty' })
  @IsEmail({}, { message: 'email-format-wrong' })
  username: string;

  @ApiProperty({
    example: 'Xypass-2023',
  })
  @IsNotEmpty({ message: 'password-empty' })
  @MinLength(8, { message: 'password-min-6' })
  @MaxLength(20, { message: 'password-max-20' })
  password: string;
}
