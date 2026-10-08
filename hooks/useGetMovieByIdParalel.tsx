import { useQueries } from '@tanstack/react-query';
import { fetchMovieById } from '../services/api';

// const useGetMovieByIdParalel = (movieIds: string[]) => {
//   // Current page query
//   const { data, isPending, error } = useQuerys({
//     queryKey: ['movieId', movieId],
//     queryFn: () => fetchMovieById(movieId)
//   })

//   return { isPending, data, error }
// };

// export default useGetMovieByIdParalel;