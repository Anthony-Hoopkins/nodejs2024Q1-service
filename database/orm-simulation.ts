import { DATABASE, EntityTypes } from './database';
import { UUID } from 'crypto';

export class OrmSimulation {
  static entityTypes = EntityTypes;
  type: EntityTypes;

  constructor(private _type: EntityTypes) {
    this.type = _type;
  }

  createEntity(dto: any, options?: { [key: string]: string }): any {
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

  updateEntity(id: UUID, dto: unknown): unknown | false {
    const eIndex = DATABASE[this.type].findIndex((entity) => entity.id === id);

    if (eIndex !== -1) {
      DATABASE[this.type].splice(eIndex, 1, dto);

      return dto;
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

    console.log(DATABASE);
  }
}
