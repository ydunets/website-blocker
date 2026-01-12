import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
@Injectable()
export class CookieService {
  static tokenKey = 'access_token';
  setToken(response: Response, token: string) {
    response.cookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  }
  removeToken(response: Response) {
    response.clearCookie(CookieService.tokenKey);
  }
}
