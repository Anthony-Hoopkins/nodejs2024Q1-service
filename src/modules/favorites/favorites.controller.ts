import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';
import { UUID } from 'crypto';
import { ErrorMessageDictionary } from '../../core/consts/error.dictionary';
import { CollectionTypes } from '../../core/enums/collection-types';

@Controller('favs')
@ApiTags('Favorites')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: ErrorMessageDictionary.invalidId,
})
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Favorites' })
  @ApiResponse({ status: HttpStatus.OK, type: [Favorite] })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'created' })
  addArtist(@Param('id', ParseUUIDPipe) id: UUID) {
    const result = this.favoritesService.addEntity(CollectionTypes.Artists, id);

    this.handleResult(result);
  }

  @Delete('artist/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: ErrorMessageDictionary.unprocessableEntity,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.favoritesService.remove(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiResponse({ status: HttpStatus.CREATED })
  addAlbum(@Param('id', ParseUUIDPipe) id: UUID) {
    const result = this.favoritesService.addEntity(CollectionTypes.Albums, id);

    this.handleResult(result);
  }

  @Delete('album/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: ErrorMessageDictionary.unprocessableEntity,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.favoritesService.remove(id);
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiResponse({ status: HttpStatus.CREATED })
  addTrack(@Param('id', ParseUUIDPipe) id: UUID) {
    const result = this.favoritesService.addEntity(CollectionTypes.Tracks, id);

    this.handleResult(result);
  }

  @Delete('track/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: ErrorMessageDictionary.unprocessableEntity,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.favoritesService.remove(id);
  }

  private handleResult(result: any) {
    if (!!result) {
      return result;
    } else {
      throw new HttpException(
        ErrorMessageDictionary.unprocessableEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
