import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto } from './dto';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
	constructor(private readonly accountService: AccountService) {}
	@Get()
	@ApiOkResponse({
		description: 'Account information retrieved successfully',
		type: AccountDto
	})
	getAccountInfo(@SessionInfo() session: GetSessionInfoDto): Promise<AccountDto> {
		return this.accountService.getAccountInfo(session.id);
	}

	@Patch()
	@ApiOkResponse({
		description: 'Account information updated successfully',
		type: AccountDto
	})
	patchAccount(@Body() body: PatchAccountDto, @SessionInfo() session: GetSessionInfoDto): Promise<AccountDto> {
		return this.accountService.patchAccount(session.id, body);
	}
}
