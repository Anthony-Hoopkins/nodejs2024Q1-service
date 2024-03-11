import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'app user', description: 'login' })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  login: string;

  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  password: string;
}
