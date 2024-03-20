import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'crypto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {
  }

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsRepository.save(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  findOne(id: UUID): Promise<Artist> {
    return this.artistsRepository.findOneBy({ id });
  }

  async update(
    id: UUID,
    updateArtistDto: UpdateArtistDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    const result = await this.artistsRepository.update(id, updateArtistDto);

    if (result.affected === 0) {
      return { result: HttpStatus.NOT_FOUND };
    } else {
      return { result: HttpStatus.OK, data: await this.findOne(id) };
    }
  }

  async remove(id: UUID): Promise<boolean> {
    const result = await this.artistsRepository.delete(id);
    return result.affected > 0;

    // const isExist = await this.artistsRepository.existsBy({ id });

    // if (isExist) {
    //   try {
    //
    //     // await this.albumService.setPropAsNull('artistId', id);
    //     // await this.trackService.setPropAsNull('artistId', id);
    //
    //
    //   } catch {
    //     await this.artistsRepository.delete(id);
    //     return true;
    //   }
    // }

    // return false;
  }
}
