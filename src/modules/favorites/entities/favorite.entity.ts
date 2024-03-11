import { CollectionTypes } from '../../../core/enums/collection-types';
import { UUID } from 'crypto';

export class Favorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export type FavItem = {
  type: CollectionTypes;
  id: UUID;
};
