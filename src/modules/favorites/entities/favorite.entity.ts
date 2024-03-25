import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Favorite {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @ApiProperty({
    example: ['Shakira', '50 Cent'],
    description: 'Favorite artists',
  })
  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[];

  @ApiProperty({
    example: ['Go to the horizon', 'Whats up'],
    description: 'Favorite Albums',
  })
  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ApiProperty({
    example: ['Walk by railways to South', 'Story about'],
    description: 'Favorite Tracks',
  })
  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];
}
