import { config } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../modules/user/entities/user.entity';
import { Artist } from '../modules/artist/entities/artist.entity';
import { Album } from '../modules/album/entities/album.entity';
import { Track } from '../modules/track/entities/track.entity';
import { Favorite } from '../modules/favorites/entities/favorite.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Migrations1711048954926 } from './1711048954926-migrations';

config();

export const dbDataSource: DataSourceOptions = {

  type: process.env.POSTGRES_TYPE as PostgresConnectionOptions['type'],
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favorite],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // synchronize: true, // WARNING Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  // synchronize: false, // WARNING Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  // migrationsRun: false,
  migrationsRun: true,
  migrations: [Migrations1711048954926],
  // migrations: ['dist/src/orm/migrations/*.js'],
};

export default new DataSource(dbDataSource);

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: process.env.POSTGRES_TYPE as PostgresConnectionOptions['type'],
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USER,
//   password: String(process.env.POSTGRES_PASSWORD),
//   database: process.env.POSTGRES_DB,
//   entities: [User, Artist, Album, Track, Favorite],
//   // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   // synchronize: true, // WARNING Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
//   // synchronize: false, // WARNING Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
//   // migrationsRun: false,
//   migrationsRun: true,
//   migrations: [Migrations1711023782732],
// };
