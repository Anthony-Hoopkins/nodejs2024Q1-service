import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../core/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Artist extends BaseEntity {
  @ApiProperty({ example: 'Filip K', description: 'Artist name' })
  @Column()
  name: string;

  @ApiProperty({ example: true, description: 'Does hi have grammy' })
  @Column({ type: 'boolean' })
  grammy: boolean;

  constructor() {
    super();
  }
}
