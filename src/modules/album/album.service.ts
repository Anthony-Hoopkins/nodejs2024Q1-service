import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { UUID } from 'crypto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {
  }

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.save(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.albumRepository.find({ relations: ['artist'] });
  }

  findOne(id: UUID): Promise<Album> {
    return this.albumRepository.findOneBy({ id });
  }

  async update(
    id: UUID,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    const artistId = updateAlbumDto.artistId;
    delete updateAlbumDto.artistId;

    const result = await this.albumRepository.update(id, { ...updateAlbumDto, artist: artistId });

    return result.affected > 0
      ? { result: HttpStatus.OK, data: { ...updateAlbumDto, id, artistId } }
      : { result: HttpStatus.NOT_FOUND };
  }

  async remove(id: UUID) {
    const result = await this.albumRepository.delete(id);
    return result.affected > 0;

   /* const isExist = await this.albumRepository.existsBy({ id });

    if (isExist) {
      await this.trackService.setPropAsNull('albumId', id);
      const result = await this.albumRepository.delete(id);
      return result.affected > 0;
    }

    return false;*/
  }

  setPropAsNull(propName: string, idToDelete: UUID): void {
    this.albumRepository.update(
      { [propName]: idToDelete }, { [propName]: null }
    );
  }
}
