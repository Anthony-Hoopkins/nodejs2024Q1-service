import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { Artist } from './entities/artist.entity';
import { UUID } from 'crypto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Artists);
  private albumOrm = new OrmSimulation(OrmSimulation.entityTypes.Albums);
  private trackOrm = new OrmSimulation(OrmSimulation.entityTypes.Tracks);

  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    // return this.orm.createEntity(createArtistDto);
    return this.artistsRepository.save(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    // return this.orm.getAllEntities();
    return this.artistsRepository.find();
  }

  findOne(id: UUID): Promise<Artist> {
    // return this.orm.getSingleEntity(id);
    return this.artistsRepository.findOneBy({ id });
  }

  async update(
    id: UUID,
    updateArtistDto: UpdateArtistDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    // const updateArt = this.orm.updateEntity(id, updateArtistDto);
    const result = await this.artistsRepository.update(id, updateArtistDto);

    console.log(result.affected);

    if (result.affected === 0) {
      return { result: HttpStatus.NOT_FOUND };
    } else {
      return { result: HttpStatus.OK, data: await this.findOne(id) };
    }
  }

  async remove(id: UUID): Promise<boolean> {
    // const result = this.orm.removeEntity(id);
    const result = await this.artistsRepository.delete(id);

    if (result.affected > 0) {
      const album = this.albumOrm.getSingleEntityByCustomId('artistId', id);
      const track = this.trackOrm.getSingleEntityByCustomId('artistId', id);

      if (album) {
        album.artistId = null;
      }

      if (track) {
        track.artistId = null;
      }
    }

    return result.affected > 0;
  }
}
