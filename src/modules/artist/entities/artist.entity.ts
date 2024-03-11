import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../core/common-entities/base.entity';

export class Artist extends BaseEntity {
  @ApiProperty({ example: 'Filip K', description: 'Artist name' })
  name: string;

  @ApiProperty({ example: true, description: 'Is hi has grammy' })
  grammy: boolean;

  constructor() {
    super();
  }
}
