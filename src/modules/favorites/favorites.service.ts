import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { CollectionTypes } from '../../core/enums/collection-types';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnFavoriteDto } from './dto/return-favorite.dto';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {
  }

  private services = {
    [CollectionTypes.Artists]: this.artistService,
    [CollectionTypes.Albums]: this.albumService,
    [CollectionTypes.Tracks]: this.trackService,
  };

  async findById(id?: string): Promise<any> { // for different favs
    const favorites = await this.favoriteRepository.findOne({ where: { id }, relations: ['artists', 'albums', 'tracks'] });
    return favorites[0];
  }

  async findAll(): Promise<ReturnFavoriteDto> {
    const favorites = (await this.favoriteRepository.find({ relations: ['artists', 'albums', 'tracks'] }))[0];

    const initCollection = {
      [CollectionTypes.Artists]: [],
      [CollectionTypes.Albums]: [],
      [CollectionTypes.Tracks]: [],
    };

    Object.keys(initCollection).forEach((key: CollectionTypes) => {
      if (favorites[key]?.length > 0) {
        favorites[key].forEach((entity) => {
          initCollection[key].push(
            this.handleSingleEntity(key, entity),
          );
        });
      }
    });

    return initCollection;
  }

  async addEntity(type: CollectionTypes, id: UUID): Promise<any | null> {
    const singleEntity = await this.services[type].findOne(id);

    if (singleEntity) {
      const favorite = (await this.favoriteRepository.find({ relations: [type] }))[0];
      favorite[type].push(singleEntity as any);
      await this.favoriteRepository.save(favorite);

      return this.handleSingleEntity(type, singleEntity);
    } else {
      return null;
    }
  }

  async remove(type: CollectionTypes, id: UUID): Promise<boolean> {
    const favorite = (await this.favoriteRepository.find({ relations: [type] }))[0];
    const entityIndex = favorite[type].findIndex(artist => artist.id === id);

    if (entityIndex !== -1) {
      favorite[type].splice(entityIndex, 1);
      await this.favoriteRepository.save(favorite);

      return true;
    }

    return false;
  }

  private handleSingleEntity(type: CollectionTypes, entity: any): { [key: string]: unknown } {
    if (type === CollectionTypes.Artists) {
      return { grammy: entity.grammy, id: entity.id, name: entity.name };
    }

    if (type === CollectionTypes.Albums) {
      return {
        artistId: entity.artistId,
        year: entity.year,
        id: entity.id,
        name: entity.name,
      };
    }

    if (type === CollectionTypes.Tracks) {
      return {
        artistId: entity.artistId,
        id: entity.id,
        name: entity.name,
        albumId: entity.albumId,
        duration: entity.duration,
      };
    }

    return entity;
  }
}
