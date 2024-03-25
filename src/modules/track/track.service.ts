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
    return this.trackRepository.save({ ...createTrackDto });
  }

  findAll(): Promise<Track[]> {
    return this.trackRepository.find({ relations: ['album', 'artist'] });
  }

  findOne(id: UUID): Promise<Track> {
    return this.trackRepository.findOne({ where: { id }});
  }

  async setPropAsNull(propName: string, idToDelete: UUID): Promise<void> {
    await this.trackRepository.update({ [propName]: idToDelete }, { [propName]: null });
  }

  async update(
    id: UUID,
    updateTrackDto: UpdateTrackDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    const result = await this.trackRepository.update(id,
      updateTrackDto,
    );

    return result.affected > 0
      ? { result: HttpStatus.OK, data: { ...updateTrackDto, id } }
      : { result: HttpStatus.NOT_FOUND };
  }

  async remove(id: UUID): Promise<boolean> {
    return (await this.trackRepository.delete(id))?.affected > 0;
  }
}
