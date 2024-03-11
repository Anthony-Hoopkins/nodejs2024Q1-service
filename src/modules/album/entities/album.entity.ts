import { BaseEntity } from '../../../core/common-entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { randomUUID } from '../../../core/consts/misc';

export class Album extends BaseEntity {
  @ApiProperty({ example: 'My dear hare', description: 'Album name' })
  name: string;

  @ApiProperty({ example: 2017, description: 'Year of creation' })
  year: number;

  @ApiProperty({ example: randomUUID, description: 'Uniq Artist ID' })
  artistId: UUID | null; // refers to Artist

  constructor() {
    super();
  }
}
