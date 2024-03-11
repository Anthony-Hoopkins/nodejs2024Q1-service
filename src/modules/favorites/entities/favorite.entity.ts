import { CollectionTypes } from '../../../core/enums/collection-types';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  @ApiProperty({
    example: ['Shakira', '50 Cent'],
    description: 'Favorite artists',
  })
  artists: string[]; // favorite artists ids

  @ApiProperty({
    example: ['Go to the horizon', 'Whats up'],
    description: 'Favorite Albums',
  })
  albums: string[]; // favorite albums ids

  @ApiProperty({
    example: ['Walk by railways to South', 'Story about'],
    description: 'Favorite Tracks',
  })
  tracks: string[]; // favorite tracks ids
}

export type FavItem = {
  type: CollectionTypes;
  id: UUID;
};
