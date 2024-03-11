import { BaseEntity } from '../../../core/common-entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from '../../../core/consts/misc';
import { UUID } from 'crypto';

export class Track extends BaseEntity {
  @ApiProperty({ example: 'My heart will go on', description: 'Track name' })
  name: string;

  @ApiProperty({ example: randomUUID, description: 'Uniq Artist ID' })
  artistId: UUID | null; // refers to Artist

  @ApiProperty({ example: randomUUID, description: 'Uniq Album ID' })
  albumId: UUID | null; // refers to Album

  @ApiProperty({ example: 321, description: 'Duration time' })
  duration: number; // integer number

  constructor() {
    super();
  }
}
