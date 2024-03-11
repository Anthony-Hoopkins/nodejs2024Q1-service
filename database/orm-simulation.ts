import { DATABASE, EntityTypes } from './database';
import { UUID } from 'crypto';
import { CollectionTypes } from '../src/core/enums/collection-types';

export class OrmSimulation {
  static entityTypes = EntityTypes;
  type: EntityTypes;

  constructor(private _type: EntityTypes) {
    this.type = _type;
  }

  createEntity(dto: any): any {
    dto.id = crypto.randomUUID();
    dto.version = 1;
    const date = +new Date();
    dto.createdAt = date;
    dto.updatedAt = date;

    DATABASE[this.type].push(dto);

    return dto;
  }

  getAllEntities(): any {
    return DATABASE[this.type];
  }

  getSingleEntity(id: UUID): any | undefined {
    return DATABASE[this.type].find((entity) => entity.id === id);
  }

  updateEntity(id: UUID, dto: any): unknown | false {
    const eIndex = DATABASE[this.type].findIndex((entity) => entity.id === id);

    if (eIndex !== -1) {
      const entityForUpdate = DATABASE[this.type][eIndex];

      const updateEntity = {
        ...entityForUpdate,
        ...dto,
        updatedAt: +new Date(),
        version: entityForUpdate.version + 1,
        id,
      };

      DATABASE[this.type].splice(eIndex, 1, updateEntity);

      console.log(DATABASE[this.type]);

      return updateEntity;
    } else {
      return false;
    }
  }

  removeEntity(id: UUID): boolean {
    const eIndex = DATABASE[this.type].findIndex((entity) => entity.id === id);

    if (eIndex !== -1) {
      DATABASE[this.type].splice(eIndex, 1);

      return true;
    } else {
      return false;
    }
  }

  setEntityToCollection(type: CollectionTypes, id: UUID): any {
    DATABASE[this.type].push({ id, type });

    return { id, type };
  }
}
