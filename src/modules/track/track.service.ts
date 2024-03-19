import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>) {
  }

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackRepository.save(createTrackDto);
  }

  findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  findOne(id: UUID): Promise<Track> {
    return this.trackRepository.findOneBy({ id });
  }

  async setPropAsNull(propName: string, id: UUID): Promise<void> {
    const track = await this.trackRepository.findOneBy({ [propName]: id });


    if (track) {
      await this.update(track.id as UUID, { [propName]: null } as UpdateTrackDto);
    }
  }

  async update(
    id: UUID,
    updateTrackDto: UpdateTrackDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    const result = await this.trackRepository.update(id, updateTrackDto);

    return result.affected > 0
      ? { result: HttpStatus.OK, data: { ...updateTrackDto, id } }
      : { result: HttpStatus.NOT_FOUND };
  }

  async remove(id: UUID): Promise<boolean> {
    return (await this.trackRepository.delete(id))?.affected > 0;
  }
}
