import { MovieType, FilmType, RatingsType } from '../types/DataTypes';

export function isMovie(source: FilmType): source is MovieType {
  return source?.Type === 'movie'
}

export function isRatings(item: string | RatingsType): item is RatingsType {
  if (typeof item === 'string') {
    return false
  } else if (item?.Source && item?.Value) {
    return true
  }
  return false
}