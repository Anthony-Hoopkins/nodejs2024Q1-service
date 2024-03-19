import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { OrmWrapper } from '../../../database/orm-wrapper';
import { CollectionTypes } from '../../core/enums/collection-types';
import { FavItem } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private favsOrm = new OrmWrapper(OrmWrapper.entityTypes.Favorites);

  private orms = {
    [CollectionTypes.Artists]: new OrmWrapper(OrmWrapper.entityTypes.Artists),
    [CollectionTypes.Albums]: new OrmWrapper(OrmWrapper.entityTypes.Albums),
    [CollectionTypes.Tracks]: new OrmWrapper(OrmWrapper.entityTypes.Tracks),
  };

  findAll() {
    const collection: FavItem[] = this.favsOrm.getAllEntities();

    const initCollection = {
      [CollectionTypes.Artists]: [],
      [CollectionTypes.Albums]: [],
      [CollectionTypes.Tracks]: [],
    };

    collection.forEach((item: FavItem) => {
      const singleEntity = this.orms[item.type].getSingleEntity(item.id);

      if (singleEntity) {
        initCollection[item.type].push(
          this.handleSingleEntity(item.type, singleEntity),
        ); // fix for tests pass
      }
    });

    return initCollection;
  }

  addEntity(type: CollectionTypes, id: UUID) {
    const singleEntity = this.orms[type].getSingleEntity(id);

    if (singleEntity) {
      return this.favsOrm.setEntityToCollection({ type, id });
    } else {
      return null;
    }
  }

  remove(id: UUID): boolean {
    return this.favsOrm.removeEntity(id);
  }

  private handleSingleEntity(type: CollectionTypes, entity: any) {
    if (type === CollectionTypes.Artists) {
      return { grammy: entity.grammy, id: entity.id, name: entity.name };
    }

    if (type === CollectionTypes.Albums) {
      return {
        artistId: entity.artistId,
        year: entity.year,
        id: entity.id,
        name: entity.name,
      };
    }

    if (type === CollectionTypes.Tracks) {
      return {
        artistId: entity.artistId,
        id: entity.id,
        name: entity.name,
        albumId: entity.albumId,
        duration: entity.duration,
      };
    }

    return entity;
  }
}
