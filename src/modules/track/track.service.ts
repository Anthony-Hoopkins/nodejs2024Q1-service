import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { OrmSimulation } from '../../../database/orm-simulation';
import { UUID } from 'crypto';

@Injectable()
export class TrackService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Tracks);

  create(createTrackDto: CreateTrackDto): Track {
    return this.orm.createEntity(createTrackDto);
  }

  findAll() {
    return this.orm.getAllEntities();
  }

  findOne(id: UUID): Track {
    return this.orm.getSingleEntity(id);
  }

  update(
    id: UUID,
    updateTrackDto: UpdateTrackDto,
  ): { result: HttpStatus; data?: any } {
    const updateItem = this.orm.updateEntity(id, updateTrackDto);

    return updateItem
      ? { result: HttpStatus.OK, data: updateItem }
      : { result: HttpStatus.NOT_FOUND };
  }

  remove(id: UUID) {
    return this.orm.removeEntity(id);
  }
}
