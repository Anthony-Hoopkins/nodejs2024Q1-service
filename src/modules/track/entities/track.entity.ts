import { ApiProperty } from '@nestjs/swagger';
import { exampleUUID } from '../../../core/consts/misc';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractDefaultEntity } from '../../../core/common-entities/abstract-default.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Track extends AbstractDefaultEntity {
  @ApiProperty({ example: 'My heart will go on', description: 'Track name' })
  @Column()
  name: string;

  @ApiProperty({ example: exampleUUID, description: 'Uniq Artist ID' })
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' }) // bind to column artistId
  artist: Artist; // refers to Artist Entity

  @Column({ type: 'uuid', nullable: true }) // configure column with artistId
  artistId: string | null;


  @ApiProperty({ example: exampleUUID, description: 'Uniq Album ID' })
  // @OneToOne(() => Album)
  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' }) // Specify the name of the column for the foreign key
  album: Album; // Define a property to store the foreign key

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  // @Column({ type: 'uuid', nullable: true })
  // albumId: UUID | null; // refers to Album

  @ApiProperty({ example: 321, description: 'Duration time' })
  @Column()
  duration: number; // integer number
}
