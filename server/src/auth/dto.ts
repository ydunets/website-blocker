import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpBodyDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  iat: number;
  @ApiProperty()
  exp: number;
}
