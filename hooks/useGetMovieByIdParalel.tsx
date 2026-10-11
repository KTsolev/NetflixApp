import { useEffect, useMemo, useRef } from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { fetchMovieById } from '../services/api';
import { useDispatch, useSelector } from 'react-redux'
import { loadExtendedMovies } from '../redux/reducers/moviesReducer'
import { sortByImdbRating, sortByDateReleaseDate } from '../helpers/arrayHelpers'
import { sortMovieByRatings, sortByRelease } from '../redux/reducers/filteredMoviesReducer'
import reactotron from 'reactotron-react-native';
import type { RootState } from '../redux/store'

const useGetMovieByIdParalel = (movieIds: string[]) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const movieIdsKey = JSON.stringify(movieIds ?? [])
  const memoizedIds = useMemo(() => JSON.parse(movieIdsKey) as string[], [movieIdsKey]);
  const mostScored = useSelector((state: RootState) => state.sortedMovies.mostScored)
  const latest = useSelector((state: RootState) => state.sortedMovies.latestMovies)
  const moviesDetails = useSelector((state: RootState) => state.movies.extendedMovies)

  const hasSortedMovies = mostScored.length > 0 && latest.length > 0

  const queryResults = useQueries({
    queries: memoizedIds.map((id) => ({
      queryKey: ['transaction', id],
      queryFn: () => fetchMovieById(id),
      enabled: queryClient.getQueryData(['transaction', id]) === undefined,
      staleTime: Infinity, // Keep data fresh to stop unwanted background fetches
    }))
  })

  const resultVersion = `${movieIds.join(',')}|${queryResults.map(item => item.dataUpdatedAt).join(',')}`
  const lastDispatchedVersion = useRef<string | null>(null)
  const allFinished = queryResults.every(item => item.isSuccess && item.data !== undefined)

  useEffect(() => {
    if (
      queryResults.length === 0 ||
      !allFinished ||
      (moviesDetails && hasSortedMovies) ||
      resultVersion === lastDispatchedVersion.current
    ) {
      return
    }

    if (allFinished) {
      lastDispatchedVersion.current = resultVersion
      reactotron.display({
        important: true,
        name: 'CONSOLE.LOG',
        preview: 'queryRes',
        value: { queryResults },
      })

      const movies = queryResults.map(item => item.data!)
      dispatch(loadExtendedMovies(movies))

      if (!hasSortedMovies) {
        const sortedByRating = [...sortByImdbRating(movies)].reverse().slice(0, 10)
        dispatch(sortMovieByRatings(sortedByRating))

        const sortedByReleaseDate = sortByDateReleaseDate(movies).slice(0, 10)
        dispatch(sortByRelease(sortedByReleaseDate))
      }

    }

  }, [allFinished, moviesDetails, hasSortedMovies])

  return queryResults
}

export default useGetMovieByIdParalel;