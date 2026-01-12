import { DbService } from './../db/db.service';
import { Injectable } from '@nestjs/common';
import { PatchAccountDto } from './dto';

@Injectable()
export class AccountService {
	constructor(private dbService: DbService) {}

	getAccountInfo(userId: number) {
		return this.dbService.account.findFirstOrThrow({ where: { ownerId: userId } });
	}

	async createAccount(userId: number) {
		return this.dbService.account.create({
			data: {
				ownerId: userId,
				isBlockingEnabled: false,
			},
		});
	}

	patchAccount(userId: number, patch: PatchAccountDto) {
		return this.dbService.account.update({
			where: { ownerId: userId },
			data: { ...patch },
		});
	}
}
