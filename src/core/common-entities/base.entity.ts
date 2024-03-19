import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from '../consts/misc';
import { UUID } from 'crypto';

export class BaseEntity {
  @ApiProperty({ example: randomUUID, description: 'Uniq ID' })
  id: UUID;

  @ApiProperty({ example: 1710152428565, description: 'createdAt' })
  createdAt: number;
  @ApiProperty({ example: 1710152428565, description: 'updatedAt' })
  updatedAt: number;
  @ApiProperty({ example: 1, description: 'version' })
  version: number; // integer number, increments on update
}
