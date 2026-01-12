import { DbService } from './../db/db.service';
import { Injectable } from '@nestjs/common';
import { AddBlockItemDto, BlockListQueryDto, BlockItemDto, BlockListDto } from './dto';

@Injectable()
export class BlockListService {
  constructor(private dbService: DbService) {}

  createBlockList(userId: number): Promise<BlockListDto> {
    return this.dbService.blockList.create({
      data: { ownerId: userId },
      include: {
        items: true,
      },
    });
  }

  getBlockListByUserId(userId: number, query: BlockListQueryDto): Promise<BlockListDto> {
    return this.dbService.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: {
            data: {
              contains: query.q,
              mode: 'insensitive',
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async getBlockItem(userId: number, itemId: number): Promise<BlockItemDto> {
	const blockList = await this.dbService.blockList.findUniqueOrThrow({
	  where: { ownerId: userId },
	});	
	return this.dbService.blockItem.findFirstOrThrow({
	  where: { id: itemId, blockListId: blockList.id },
	});
  }

  async addBlockListItem(userId: number, item: AddBlockItemDto): Promise<BlockItemDto> {
    const blockList = await this.dbService.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.dbService.blockItem.create({
      data: {
        blockListId: blockList.id,
        type: item.type,
		data: item.data,
      },
    });
  }

  async removeBlockListItem(userId: number, itemId: number): Promise<BlockItemDto> {
    const blockList = await this.dbService.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.dbService.blockItem.delete({
      where: { id: itemId, blockListId: blockList.id },
    });
  }
}
