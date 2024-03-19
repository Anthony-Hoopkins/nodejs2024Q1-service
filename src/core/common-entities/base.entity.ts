import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from '../consts/misc';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @ApiProperty({ example: randomUUID, description: 'Uniq ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1, description: 'version' })
  @Column({ default: 1 })
  version: number; // integer number, increments on update
}
