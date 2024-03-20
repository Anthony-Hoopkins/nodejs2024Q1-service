import { ApiProperty } from '@nestjs/swagger';
import { exampleUUID } from '../consts/misc';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @ApiProperty({ example: exampleUUID, description: 'Uniq ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1, description: 'version' })
  @Column({ default: 1 })
  version: number; // integer number, increments on update
}
