import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import type { BlockItemType } from "generated/prisma/client";
import { BlockItemType as BlockItemTypeEnum } from "generated/prisma/client";

export class BlockListDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  ownerId: number;

  @ApiProperty({ type: () => [BlockItemDto] })
  items: BlockItemDto[];
}

export class BlockItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  blockListId: number;
  @ApiProperty({
	enum: [...Object.values(BlockItemTypeEnum)],
  })
  type: BlockItemType;
  @ApiProperty()
  data: string;
  @ApiProperty()
  createdAt: Date;
}

export class AddBlockItemDto {
  @ApiProperty({
	enum: [...Object.values(BlockItemTypeEnum)],
  })
  @IsIn([...Object.values(BlockItemTypeEnum)])
  type: BlockItemType;
  
  @ApiProperty()
  @IsNotEmpty()
  data: string;
}

export class BlockListQueryDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  q?: string;
}