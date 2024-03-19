import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { config } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../modules/user/entities/user.entity';
import { Artist } from '../modules/artist/entities/artist.entity';
import { Album } from '../modules/album/entities/album.entity';
import { Track } from '../modules/track/entities/track.entity';

config();

// export const dbDataSource: DataSourceOptions = {
//   type: process.env.POSTGRES_TYPE as PostgresConnectionOptions['type'],
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USER,
//   password: String(process.env.POSTGRES_PASSWORD),
//   database: process.env.POSTGRES_DB,
//   entities: [User, Artist],
//   // entities: ['dist/**/*.entity.js'],
//   // migrations: ['dist/migrations/*.js'],
//   // synchronize: false,
//   synchronize: true,
//   migrationsRun: false,
// };

// export default new DataSource(dbDataSource);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.POSTGRES_TYPE as PostgresConnectionOptions['type'],
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // WARNING Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  migrationsRun: false,
};
