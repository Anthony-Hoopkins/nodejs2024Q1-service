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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Album } from './entities/album.entity';
import { UUID } from 'crypto';
import { ErrorMessageDictionary } from '../../core/consts/error.dictionary';

@Controller('album')
@ApiTags('Album')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: ErrorMessageDictionary.invalidId,
})
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: ErrorMessageDictionary.notFound,
})
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Create Album' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Album })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Albums' })
  @ApiResponse({ status: HttpStatus.OK, type: [Album] })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Album by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const album = await this.albumService.findOne(id);

    if (album) {
      return album;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Album by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Album })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: UpdateAlbumDto,
  ): Promise<Album> {
    const result = await this.albumService.update(id, updateDto);

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
  @ApiOperation({ summary: 'Remove Album by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    const result = await this.albumService.remove(id);

    if (result) {
      return;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
