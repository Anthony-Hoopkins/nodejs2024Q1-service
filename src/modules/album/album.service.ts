import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { Album } from './entities/album.entity';
import { UUID } from 'crypto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Albums);
  private trackOrm = new OrmSimulation(OrmSimulation.entityTypes.Tracks);

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.orm.createEntity(createAlbumDto);
  }

  findAll(): Album {
    return this.orm.getAllEntities();
  }

  findOne(id: UUID): Album {
    return this.orm.getSingleEntity(id);
  }

  update(
    id: UUID,
    updateAlbumDto: UpdateAlbumDto,
  ): { result: HttpStatus; data?: any } {
    const updateAlb = this.orm.updateEntity(id, updateAlbumDto);

    return updateAlb
      ? { result: HttpStatus.OK, data: updateAlb }
      : { result: HttpStatus.NOT_FOUND };
  }

  remove(id: UUID) {
    const result = this.orm.removeEntity(id);

    if (result) {
      const track = this.trackOrm.getSingleEntityByCustomId('albumId', id);

      if (track) {
        track.albumId = null;
      }
    }

    return result;
  }
}
