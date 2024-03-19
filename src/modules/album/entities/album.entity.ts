import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { exampleUUID } from '../../../core/consts/misc';
import { Column, Entity } from 'typeorm';
import { AbstractDefaultEntity } from '../../../core/common-entities/abstract-default.entity';

@Entity()
export class Album extends AbstractDefaultEntity {
  @ApiProperty({ example: 'My dear hare', description: 'Album name' })
  @Column()
  name: string;

  @ApiProperty({ example: 2017, description: 'Year of creation' })
  @Column()
  year: number;

  @ApiProperty({ example: exampleUUID, description: 'Uniq Artist ID' })
  @Column({ type: 'uuid', nullable: true })
  artistId: UUID | null; // refers to Artist

  constructor() {
    super();
  }
}
