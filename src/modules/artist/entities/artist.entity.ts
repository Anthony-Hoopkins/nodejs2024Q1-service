import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../core/common-entities/base.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Artist extends BaseEntity {
  @ApiProperty({ example: 'Filip K', description: 'Artist name' })
  @Column()
  name: string;

  @ApiProperty({ example: true, description: 'Does hi have grammy' })
  @Column({ type: 'boolean' })
  grammy: boolean;

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
