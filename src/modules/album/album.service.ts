import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { UUID } from 'crypto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  // private trackOrm = new OrmWrapper(OrmWrapper.entityTypes.Tracks);

  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private readonly trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.save(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  findOne(id: UUID): Promise<Album> {
    return this.albumRepository.findOneBy({ id });
  }

  async update(
    id: UUID,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    const result = await this.albumRepository.update(id, updateAlbumDto);

    return result.affected > 0
      ? { result: HttpStatus.OK, data: { ...updateAlbumDto, id } }
      : { result: HttpStatus.NOT_FOUND };
  }

  async remove(id: UUID) {
    const result = await this.albumRepository.delete(id);
    console.log(result);

    if (result.affected > 0) {
      await this.trackService.setPropAsNull('albumId', id);
    }

    return result.affected > 0;
  }
}
