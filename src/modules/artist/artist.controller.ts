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

@Controller('artist')
@ApiTags('Artist')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: ErrorMessageDictionary.invalidId,
})
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: ErrorMessageDictionary.notFound,
})
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create Artist' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Artist })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Artists' })
  @ApiResponse({ status: HttpStatus.OK, type: [Artist] })
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Artist by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Artist })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const artist = await this.artistService.findOne(id);

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
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: UpdateArtistDto,
  ) {
    const result = await this.artistService.update(id, updateDto);

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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    const isRemoved = await this.artistService.remove(id);

    if (isRemoved) {
      return;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
