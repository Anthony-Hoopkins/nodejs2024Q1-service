import { BaseEntity } from '../../../core/common-entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { randomUUID } from '../../../core/consts/misc';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Album extends BaseEntity {
  @ApiProperty({ example: 'My dear hare', description: 'Album name' })
  @Column()
  name: string;

  @ApiProperty({ example: 2017, description: 'Year of creation' })
  @Column()
  year: number;

  @ApiProperty({ example: randomUUID, description: 'Uniq Artist ID' })
  @Column({ type: 'uuid', nullable: true })
  artistId: UUID | null; // refers to Artist

  @ApiProperty({
    example: '2024-03-18T10:22:02.717Z',
    description: 'createdAt',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-18T10:22:02.717Z',
    description: 'updatedAt',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor() {
    super();
  }
}
