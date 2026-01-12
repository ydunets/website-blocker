import { CookieService } from './cookie.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SignInBodyDto, SignUpBodyDto, GetSessionInfoDto } from './dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}
  @Post('signin')
  @ApiOkResponse({ description: 'User successfully signed in' })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Sign-in implementation goes here
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );

    this.cookieService.setToken(response, accessToken);
  }

  @Post('signup')
  @ApiOkResponse({ description: 'User successfully registered' })
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() body: SignUpBodyDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Sign-up implementation goes here
    const { accessToken } = await this.authService.signUp(
      body.email,
      body.password,
    );

    this.cookieService.setToken(response, accessToken);
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) response: Response) {
    this.cookieService.removeToken(response); // Implementation goes here
  }

  @Post('session-info')
  @ApiOkResponse({
    description: 'Session information retrieved successfully',
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    // get session info implementation goes here
    return session;
  }
}
