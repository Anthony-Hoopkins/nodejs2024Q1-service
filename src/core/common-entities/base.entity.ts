import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from '../consts/misc';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ example: randomUUID, description: 'Uniq ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1, description: 'version' })
  @Column({ default: 1 })
  version: number; // integer number, increments on update

  @ApiProperty({ example: 1710152428565, description: 'createdAt' })
  // @Column({ type: 'bigint' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ example: 1710152428565, description: 'updatedAt' })
  // @Column({ type: 'bigint' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  //
  // @Column({ type: 'timestamp' })
  // createdAt: Date;
  //
  // @Column({ type: 'timestamp' })
  // updatedAt: Date;
}
