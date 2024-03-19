import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from '../../../core/consts/misc';

export class CreateTrackDto {
  @ApiProperty({ example: 'Go to the horizon', description: 'Name' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  name: string;

  @ApiProperty({ example: 278, description: 'Duration' })
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsNumber({}, { message: ErrorMessageDictionary.haveToBeNumber })
  duration: number;

  @ApiProperty({ example: randomUUID, description: 'Artist Id' })
  artistId: UUID | null;

  @ApiProperty({ example: randomUUID, description: 'Album Id' })
  albumId: UUID | null;
}
