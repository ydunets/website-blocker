import { randomBytes, pbkdf2Sync } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  getSalt() {
    return randomBytes(16).toString('hex');
  }
  getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }
}
