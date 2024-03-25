import { ApiProperty } from '@nestjs/swagger';
import { exampleUUID } from '../../../core/consts/misc';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractDefaultEntity } from '../../../core/common-entities/abstract-default.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Album extends AbstractDefaultEntity {
  @ApiProperty({ example: 'My dear hare', description: 'Album name' })
  @Column()
  name: string;

  @ApiProperty({ example: 2017, description: 'Year of creation' })
  @Column()
  year: number;

  @ApiProperty({ example: exampleUUID, description: 'Uniq Artist ID' })
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  // @OneToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ nullable: true })
  artistId: string | null;

  // @OneToOne(() => Artist)
  // @JoinColumn()
  // artist: Artist;

  // @Column({ type: 'uuid', nullable: true })
  // artistId: UUID | null; // refers to Artist

  constructor() {
    super();
  }
}
