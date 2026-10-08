import api from './axios';
import { DataType, MovieType, SeriesType } from '../types/DataTypes';

export const fetchMovies = async (search: string, type: string, page: number): Promise<DataType> => {

  const response = await api.get('', {
    params: {
      apikey: api.defaults.params.apikey,
      s: search,
      page,
      type,
    },
  });
  if (response.data.Response === 'False') {
    throw new Error(response.data.Error);
  }
  return response.data as DataType;
}

export const fetchMovieById = async (id: string): Promise<MovieType | SeriesType> => {
  const response = await api.get('', {
    params: {
      apikey: api.defaults.params.apikey,
      i: id,
    },
  });
  if (response.data.Response === 'False') {
    throw new Error(response.data.Error);
  }
  return response.data as MovieType | SeriesType;
}
