import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: '123qwerty', description: 'Old password' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  oldPassword: string;

  @ApiProperty({ example: 'new_123qwerty', description: 'New password' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  newPassword: string;
}
