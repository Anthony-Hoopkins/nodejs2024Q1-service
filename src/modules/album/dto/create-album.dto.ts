import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from '../../../core/consts/misc';

export class CreateAlbumDto {
  @ApiProperty({ example: 'The best Album', description: 'Name' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  name: string;

  @ApiProperty({ example: 2017, description: 'Year' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsNumber({}, { message: ErrorMessageDictionary.haveToBeNumber })
  year: number;

  @ApiProperty({ example: randomUUID, description: 'Artist Id' })
  artistId: UUID | null;
}
