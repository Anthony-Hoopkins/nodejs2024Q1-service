import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class AbstractDefaultEntity extends BaseEntity {
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
}
