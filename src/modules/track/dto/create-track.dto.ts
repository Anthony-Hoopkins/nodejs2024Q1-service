import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { exampleUUID } from '../../../core/consts/misc';

export class CreateTrackDto {
  @ApiProperty({ example: 'Go to the horizon', description: 'Name' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  name: string;

  @ApiProperty({ example: 278, description: 'Duration' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsNumber({}, { message: ErrorMessageDictionary.haveToBeNumber })
  duration: number;

  @ApiProperty({ example: exampleUUID, description: 'Artist Id' })
  @IsUUID()
  @IsOptional()
  artistId: UUID | null;

  @ApiProperty({ example: exampleUUID, description: 'Album Id' })
  @IsUUID()
  @IsOptional()
  albumId: UUID | null;
}
