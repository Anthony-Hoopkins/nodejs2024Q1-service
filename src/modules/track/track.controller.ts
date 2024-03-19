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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { ErrorMessageDictionary } from '../../core/consts/error.dictionary';

@Controller('track')
@ApiTags('Track')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: ErrorMessageDictionary.invalidId,
})
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: ErrorMessageDictionary.notFound,
})
export class TrackController {
  constructor(private readonly trackService: TrackService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create Track' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Track })
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Tracks' })
  @ApiResponse({ status: HttpStatus.OK, type: [Track] })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Track by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID): Promise<Track> {
    const oneItem = await this.trackService.findOne(id);

    if (oneItem) {
      return oneItem;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Track by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: Track })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: UpdateTrackDto,
  ): Promise<Track> {
    const result = await this.trackService.update(id, updateDto);

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
  @ApiOperation({ summary: 'Remove Track by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    const removedItem = await this.trackService.remove(id);

    if (removedItem) {
      return;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
