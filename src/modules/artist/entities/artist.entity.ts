import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AbstractDefaultEntity } from '../../../core/common-entities/abstract-default.entity';

@Entity()
export class Artist extends AbstractDefaultEntity {
  @ApiProperty({ example: 'Filip K', description: 'Artist name' })
  @Column()
  name: string;

  @ApiProperty({ example: true, description: 'Does hi have grammy' })
  @Column({ type: 'boolean' })
  grammy: boolean;
}
