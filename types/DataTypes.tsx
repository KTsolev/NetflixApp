interface RecordType {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

type RatingsType = {
  Source: string;
  Value: string;
}

interface RecordTypeExtended extends Partial<RecordType> {
  Released: string;
  Runtime: string;
  Genre: string;
  Ratings: RatingsType[];
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: number;
  imdbRating: number;
  imdbVotes: number;
  response: boolean;
}

interface MovieType extends RecordTypeExtended {
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

interface SeriesType extends RecordTypeExtended {
  totalSeasons: number;
}

type FilmType = MovieType | SeriesType;

type DataType = {
  Search: RecordType[];
  totalResults: number;
  Response: boolean;
}

export enum Genres {
  Action,
  Anime,
  History,
  Adventure,
  Crime,
  Fantasy,
  SciFi,
  Drama,
  Comedy,
  Horror,
  Romance,
  Thriller
}

export type {
  RecordType,
  RecordTypeExtended,
  RatingsType,
  DataType,
  MovieType,
  FilmType,
  SeriesType
};