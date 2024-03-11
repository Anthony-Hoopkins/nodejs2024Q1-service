import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';
import { UUID } from 'crypto';

export class CreateTrackDto {
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  name: string;

  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsNumber({}, { message: ErrorMessageDictionary.haveToBeNumber })
  duration: number;

  // @IsUUID(4, { message: ErrorMessageDictionary.haveToBeUUID })
  artistId: UUID | null;

  // @IsUUID(4, { message: ErrorMessageDictionary.haveToBeUUID })
  albumId: UUID | null;
}
