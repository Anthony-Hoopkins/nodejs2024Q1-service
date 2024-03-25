import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';
import { AbstractDefaultEntity } from '../../../core/common-entities/abstract-default.entity';

@Entity()
// @Index(["name", "grammy"], { unique: true })
export class Artist extends AbstractDefaultEntity {
  @ApiProperty({ example: 'Filip K', description: 'Artist name' })
  @Index()
  @Column()
  name: string;

  @ApiProperty({ example: true, description: 'Does hi have grammy' })
  // @Index({ unique: true })
  @Column({ type: 'boolean' })
  grammy: boolean;
}
