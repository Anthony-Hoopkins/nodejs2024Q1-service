import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => TrackModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
