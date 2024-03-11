import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessageDictionary } from '../../../core/consts/error.dictionary';

export class CreateArtistDto {
  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsString({ message: ErrorMessageDictionary.haveToBeString })
  name: string;

  @IsNotEmpty({ message: ErrorMessageDictionary.required })
  @IsBoolean({ message: ErrorMessageDictionary.haveToBeBoolean })
  grammy: boolean;
}
