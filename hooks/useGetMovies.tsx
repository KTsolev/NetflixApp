import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../services/api';
import { loadMovies, clearMovieArrays } from '../redux/reducers/moviesReducer';
import { clearSortedArrays } from '../redux/reducers/filteredMoviesReducer'

const useGetMovies = (searchTerm: string, type: string) => {
  const scopeKey = JSON.stringify([searchTerm, type])
  const [pagination, setPagination] = useState({ scopeKey, page: 1 })
  const page = pagination.scopeKey === scopeKey ? pagination.page : 1
  const dispatch = useDispatch()
  const prevType = useRef<string | null>(null)
  const prevSearch = useRef<string | null>(null)
  const activeScope = useRef(scopeKey)
  activeScope.current = scopeKey

  // Current page query
  const { data, isPending, error } = useQuery({
    queryKey: ['movies', searchTerm, type, page],
    queryFn: () => fetchMovies(searchTerm, type, page),
    staleTime: 1000 * 60 * 5,
  })
  useEffect(() => {
    if (prevType.current !== type || prevSearch.current !== searchTerm) {
      dispatch(clearMovieArrays([]))
      dispatch(clearSortedArrays([]))
      prevType.current = type
      prevSearch.current = searchTerm
    }
  }, [type, searchTerm])

  useEffect(() => {
    if (pagination.scopeKey !== scopeKey) {
      setPagination({ scopeKey, page: 1 })
    }
  }, [pagination.scopeKey, scopeKey])

  useEffect(() => {
    if (data && activeScope.current === scopeKey) {
      if (page < 10 && page < Number(data.totalResults ?? 0)) {
        setPagination(current => (
          current.scopeKey === scopeKey && current.page === page
            ? { scopeKey, page: page + 1 }
            : current
        ))
      }
      dispatch(loadMovies(data.Search ?? []))
    }
  }, [data, dispatch, page, scopeKey])

  return { isPending, data, error }
};

export default useGetMovies;