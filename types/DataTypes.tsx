interface RecordType {
  imdbID: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

type ReatingsType = {
  source: string;
  value: string;
}

interface RecordTypeExtended extends Partial<RecordType> {
  released: string;
  runtime: number;
  genre: string;
  ratings: ReatingsType[];
  director: string;
  writter: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  metascore: number;
  imdbRating: number;
  imdbVotes: number;
  repsonse: boolean;
}

interface MovieType extends RecordTypeExtended {
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
}

interface SeriesType extends RecordTypeExtended {
  totalSeasons: number;
}

type DataType = {
  movies: RecordType[];
  totalResults: number;
  response: boolean;
}

export type {
  RecordType,
  RecordTypeExtended,
  ReatingsType,
  DataType,
  MovieType,
  SeriesType
};