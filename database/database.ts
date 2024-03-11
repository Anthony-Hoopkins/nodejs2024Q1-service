export enum EntityTypes {
  Users = 'users',
  Artists = 'artists',
  Albums = 'albums',
  Tracks = 'tracks',
  Favorites = 'favorites',
}

export const DATABASE = {
  [EntityTypes.Users]: [],
  [EntityTypes.Artists]: [],
  [EntityTypes.Albums]: [],
  [EntityTypes.Tracks]: [],
  [EntityTypes.Favorites]: [],
};
