import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlockListService } from './block-list.service';
import {
  AddBlockItemDto,
  BlockItemDto,
  BlockListDto,
  BlockListQueryDto,
} from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';

@Controller('block-list')
export class BlockListController {
  constructor(private readonly blockListService: BlockListService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Block list retrieved successfully',
    type: BlockListDto,
  })
  getBlockList(
    @Query() query: BlockListQueryDto,
    @SessionInfo() sessionInfo: GetSessionInfoDto,
  ): Promise<BlockListDto> {
    return this.blockListService.getBlockListByUserId(sessionInfo.id, query);
  }

  @Get('item/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Block item retrieved successfully',
    type: BlockItemDto,
  })
  getBlockItem(
    @Param('id', ParseIntPipe) itemId: number,
    @SessionInfo() sessionInfo: GetSessionInfoDto,
  ): Promise<BlockItemDto> {
    return this.blockListService.getBlockItem(sessionInfo.id, itemId);
  }

  @Post('item')
  @ApiCreatedResponse({
    type: BlockItemDto,
  })
  @UseGuards(AuthGuard)
  addBlockItem(
    @Body() body: AddBlockItemDto,
    @SessionInfo() sessionInfo: GetSessionInfoDto,
  ): Promise<BlockItemDto> {
    return this.blockListService.addBlockListItem(sessionInfo.id, body);
  }

  @Delete('item/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Block item removed successfully' })
  removeBlockItem(
    @Param('id', ParseIntPipe) id: number,
    @SessionInfo() sessionInfo: GetSessionInfoDto,
  ): Promise<BlockItemDto> {
    return this.blockListService.removeBlockListItem(sessionInfo.id, id);
  }
}
