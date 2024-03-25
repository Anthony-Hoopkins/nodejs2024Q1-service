import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../core/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: 'app_user', description: 'Uniq login name' })
  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: 1710152428565, description: 'createdAt' })
  @Column({ type: 'bigint' })
  createdAt: number;

  @ApiProperty({ example: 1710152428565, description: 'updatedAt' })
  @Column({ type: 'bigint' })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
