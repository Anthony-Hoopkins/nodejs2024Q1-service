import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { Artist } from './entities/artist.entity';
import { UUID } from 'crypto';

@Injectable()
export class ArtistService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Artists);
  private albumOrm = new OrmSimulation(OrmSimulation.entityTypes.Albums);
  private trackOrm = new OrmSimulation(OrmSimulation.entityTypes.Tracks);

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
    const result = this.orm.removeEntity(id);

    if (result) {
      const album = this.albumOrm.getSingleEntityByCustomId('artistId', id);
      const track = this.trackOrm.getSingleEntityByCustomId('artistId', id);

      if (album) {
        album.artistId = null;
      }

      if (track) {
        track.artistId = null;
      }
    }

    return result;
  }
}
