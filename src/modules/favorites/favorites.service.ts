import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { CollectionTypes } from '../../core/enums/collection-types';
import { FavItem } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Favorites);

  private orms = {
    [CollectionTypes.Artists]: new OrmSimulation(
      OrmSimulation.entityTypes.Artists,
    ),
    [CollectionTypes.Albums]: new OrmSimulation(
      OrmSimulation.entityTypes.Albums,
    ),
    [CollectionTypes.Tracks]: new OrmSimulation(
      OrmSimulation.entityTypes.Tracks,
    ),
  };

  findAll() {
    const collection: FavItem[] = this.orm.getAllEntities();

    const initCollection = {
      [CollectionTypes.Artists]: [],
      [CollectionTypes.Albums]: [],
      [CollectionTypes.Tracks]: [],
    };

    collection.forEach((item: FavItem) => {
      const singleEntity = this.orms[item.type].getSingleEntity(item.id);

      if (singleEntity) {
        initCollection[item.type].push(
          this.orms[item.type].getSingleEntity(item.id),
        );
      }
    });

    console.log(initCollection);

    return initCollection;
  }

  addEntity(type: CollectionTypes, id: UUID) {
    const singleEntity = this.orms[type].getSingleEntity(id);

    if (!!singleEntity) {
      return this.orm.setEntityToCollection(CollectionTypes.Artists, id);
    } else {
      return null;
    }
  }

  remove(id: UUID): boolean {
    return this.orm.removeEntity(id);
  }
}
