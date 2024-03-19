import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ example: '50 Cent', description: 'Name' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  name: string;

  @ApiProperty({ example: true, description: 'Does have Grammy' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsBoolean({ message: ErrorMessageDictionary.haveToBeBoolean })
  grammy: boolean;
}
