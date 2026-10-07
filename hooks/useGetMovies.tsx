import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../services/api';
import { loadMovies } from '../redux/reducers/moviesReducer';

const useGetMovies = (searchTerm: 'all', type: 'movie') => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  // Current page query
  const { data, isPending, error } = useQuery({
    queryKey: ['movies', searchTerm, page],
    queryFn: () => fetchMovies(searchTerm, page)
  })

  // Prefetch the NEXT page inside a useEffect hook
  useEffect(() => {
    queryClient.query({
      queryKey: ['movies', searchTerm, page],
      queryFn: () => fetchMovies(searchTerm, page),
      staleTime: 1000 * 60 * 5 // Treat as fresh for 1 minute 
    })
  }, [page, queryClient])

  useEffect(() => {
    if (data) {
      if (page < 10) { // fetch fitst 10 pages only, because the API has a limit of 1000 results
        setPage((prevPage) => prevPage + 1)
      }
      dispatch(loadMovies(data?.Search))
    }
  }, [data, dispatch])

  return { isPending, error }
};

export default useGetMovies;