import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../core/common-entities/base.entity';

export class User extends BaseEntity {
  @ApiProperty({ example: 'app_user', description: 'Uniq login name' })
  login: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
