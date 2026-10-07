import { useQuery } from '@tanstack/react-query';
import { fetchMovieById, } from '../services/api';


const useGetMovieById = (movieId: string) => {

  // Current page query
  const { data, isPending, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieById(movieId)
  })

  return { isPending, data, error }
};

export default useGetMovieById;