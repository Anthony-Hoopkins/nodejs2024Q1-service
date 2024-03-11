import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { Artist } from './entities/artist.entity';
import { UUID } from 'crypto';

@Injectable()
export class ArtistService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Artists);

  create(createArtistDto: CreateArtistDto): Artist {
    return this.orm.createEntity(createArtistDto);
  }

  findAll(): Artist[] {
    return this.orm.getAllEntities();
  }

  findOne(id: UUID) {
    return this.orm.getSingleEntity(id);
  }

  update(
    id: UUID,
    updateArtistDto: UpdateArtistDto,
  ): { result: HttpStatus; data?: any } {
    const updateArt = this.orm.updateEntity(id, updateArtistDto);

    return updateArt
      ? { result: HttpStatus.OK, data: updateArt }
      : { result: HttpStatus.NOT_FOUND };
  }

  remove(id: UUID) {
    // todo set album artistId to null after deletion
    // todo set track artistId to null after deletion

    return this.orm.removeEntity(id);
  }
}
