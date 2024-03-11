import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { randomUUID } from '../../../core/consts/misc';

export class User {
  @ApiProperty({ example: randomUUID, description: 'Uniq ID' })
  // @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: UUID; // uuid v4

  @ApiProperty({ example: 'app_user', description: 'Uniq login name' })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: 1, description: 'version' })
  version: number; // integer number, increments on update
  @ApiProperty({ example: 1710152428565, description: 'createdAt' })
  createdAt: number; // timestamp of creation
  @ApiProperty({ example: 1710152428565, description: 'updatedAt' })
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
