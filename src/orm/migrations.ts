import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Favorite } from '../modules/favorites/entities/favorite.entity';

const albumColumns = [
  { name: 'id', type: 'uuid', isPrimary: true },
  { name: 'version', type: 'integer' },
  { name: 'name', type: 'varchar', length: '255' },
  { name: 'year', type: 'integer' },
  { name: 'artistId', type: 'uuid' },
  { name: 'createdAt', type: 'timestamp' },
  { name: 'updatedAt', type: 'timestamp' },
];

const favsColumns = [
  { name: 'id', type: 'uuid', isPrimary: true },
  { name: 'name', type: 'varchar', length: '255' },
  // { name: 'artists', type: 'uuid' },
  // { name: 'albums', type: 'uuid' },
  // { name: 'tracks', type: 'uuid' },
];

export class AlbumInit implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({ name: 'album', columns: albumColumns });
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('album');
  }
}

export class FavsInit implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({ name: 'favorite', columns: favsColumns });
    await queryRunner.createTable(table, true);

    console.log('FavsInit Migrations')
    const rows = [{ name: 'default-name' }];
    await queryRunner.manager.getRepository(Favorite).save(rows);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorite');
  }
}
