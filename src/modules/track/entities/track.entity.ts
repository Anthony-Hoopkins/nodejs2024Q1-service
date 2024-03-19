import { ApiProperty } from '@nestjs/swagger';
import { exampleUUID } from '../../../core/consts/misc';
import { UUID } from 'crypto';
import { Column, Entity } from 'typeorm';
import { AbstractDefaultEntity } from '../../../core/common-entities/abstract-default.entity';

@Entity()
export class Track extends AbstractDefaultEntity {
  @ApiProperty({ example: 'My heart will go on', description: 'Track name' })
  @Column()
  name: string;

  @ApiProperty({ example: exampleUUID, description: 'Uniq Artist ID' })
  @Column({ type: 'uuid', nullable: true })
  artistId: UUID | null; // refers to Artist

  @ApiProperty({ example: exampleUUID, description: 'Uniq Album ID' })
  @Column({ type: 'uuid', nullable: true })
  albumId: UUID | null; // refers to Album

  @ApiProperty({ example: 321, description: 'Duration time' })
  @Column()
  duration: number; // integer number
}
