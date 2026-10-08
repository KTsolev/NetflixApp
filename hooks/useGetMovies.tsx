import { useEffect, useState, useRef } from 'react';
import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchMovies, fetchMovieById } from '../services/api';
import { loadMovies, emptyMovies } from '../redux/reducers/moviesReducer';

const useGetMovies = (searchTerm: 'all', type: 'movie') => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [ids, setIds] = useState<string[]>([])

  const dispatch = useDispatch()
  const prevType = useRef(null)
  const prevSearch = useRef(null)

  // Current page query
  const { data, isPending, error } = useQuery({
    queryKey: ['movies', searchTerm, type, page],
    queryFn: () => fetchMovies(searchTerm, type, page)
  })

  // const queryResults = useQueries({
  //   queries: ids.map((id) => ({
  //     queryKey: ['movieId', id],
  //     queryFn: () => fetchMovieById(id)
  //   }))
  // })

  useEffect(() => {
    if (prevType.current !== type || prevSearch.current !== searchTerm) {
      dispatch(emptyMovies([]))
      prevType.current = type
      prevSearch.current = searchTerm
    }
  }, [type])

  // useEffect(() => {
  //   console.log('Results:', queryResults)

  //   const reactotron = (globalThis as any).Reactotron

  //   reactotron?.display?.({
  //     name: 'TRON',
  //     value: 'res',
  //     preview: { ...queryResults },
  //   })
  // }, [ids, queryResults])

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
      const dataIds = data?.Search?.map(item => item.imdbID)
      setIds(dataIds)
      dispatch(loadMovies(data?.Search))
    }
  }, [data, dispatch])

  return { isPending, error }
};

export default useGetMovies;