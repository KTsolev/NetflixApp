import { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../services/api';
import { loadMovies, clearMovieArrays } from '../redux/reducers/moviesReducer';
import { clearSortedArrays } from '../redux/reducers/filteredMoviesReducer'

const useGetMovies = (searchTerm: 'all', type: 'movie') => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const prevType = useRef(null)
  const prevSearch = useRef(null)

  // Current page query
  const { data, isPending, error } = useQuery({
    queryKey: ['movies', searchTerm, type, page],
    queryFn: () => fetchMovies(searchTerm, type, page)
  })

  useEffect(() => {
    if (prevType.current !== type || prevSearch.current !== searchTerm) {
      dispatch(clearMovieArrays([]))
      dispatch(clearSortedArrays([]))
      prevType.current = type
      prevSearch.current = searchTerm
    }
  }, [type])

  // Prefetch the NEXT page inside a useEffect hook
  useEffect(() => {
    queryClient.query({
      queryKey: ['movies', searchTerm, type, page],
      queryFn: () => fetchMovies(searchTerm, type, page),
      staleTime: 1000 * 60 * 5 // Treat as fresh for 1 minute 
    })
  }, [page, queryClient])

  useEffect(() => {
    if (data) {
      if (page < 10 && page < data?.totalResults) { // fetch fitst 10 pages only, because the API has a limit of 1000 results
        setPage((prevPage) => prevPage + 1)
      }
      dispatch(loadMovies(data?.Search))
    }
  }, [data, dispatch])

  return { isPending, error }
};

export default useGetMovies;