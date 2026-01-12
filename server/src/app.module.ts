import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { BlockListModule } from './block-list/block-list.module';

@Module({
  imports: [DbModule, UsersModule, AuthModule, AccountModule, BlockListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
