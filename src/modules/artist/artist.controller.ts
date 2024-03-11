import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { UUID } from 'crypto';
import { ErrorMessageDictionary } from '../../core/consts/error.dictionary';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create Artist' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Artist })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Artists' })
  @ApiResponse({ status: HttpStatus.OK, type: [Artist] })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Artist by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const artist = this.artistService.findOne(id);

    if (artist) {
      return artist;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Artist by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: UpdateArtistDto,
  ): Artist {
    const result = this.artistService.update(id, updateDto);

    switch (result.result) {
      case HttpStatus.OK:
        return result.data;
      case HttpStatus.NOT_FOUND:
        throw new HttpException(
          ErrorMessageDictionary.notFound,
          HttpStatus.NOT_FOUND,
        );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Artist by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID): void {
    const artist = this.artistService.remove(id);

    if (artist) {
      return;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
