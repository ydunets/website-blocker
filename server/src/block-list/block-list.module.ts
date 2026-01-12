import { Module } from '@nestjs/common';
import { BlockListService } from './block-list.service';
import { BlockListController } from './block-list.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [BlockListController],
  providers: [BlockListService],
  exports: [BlockListService],
})
export class BlockListModule {}
