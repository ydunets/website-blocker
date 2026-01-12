import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DbService,
    private readonly accountService: AccountService,
    private readonly blockListService: BlockListService,
  ) {}

  findByEmail(email: string) {
    return this.dbService.user.findFirst({ where: { email } });
  }

  async createUser(email: string, hash: string, salt: string) {
    const newUser = await this.dbService.user.create({
      data: {
        email,
        hash,
        salt,
      },
    });

    await this.accountService.createAccount(newUser.id);

    await this.blockListService.createBlockList(newUser.id);

    return newUser;
  }
}
