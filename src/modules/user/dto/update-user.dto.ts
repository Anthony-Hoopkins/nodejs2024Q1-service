import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  oldPassword: string;

  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  newPassword: string;
}
