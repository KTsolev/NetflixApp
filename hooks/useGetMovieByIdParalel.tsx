import { useEffect, useMemo, useRef } from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { fetchMovieById } from '../services/api';
import { useDispatch } from 'react-redux'
import { loadExtendedMovies } from '../redux/reducers/moviesReducer'
import { sortByImdbRating, sortByDateReleaseDate } from '../helpers/arrayHelpers'
import { sortMovieByRatings, sortByRelease } from '../redux/reducers/filteredMoviesReducer'
import reactotron from 'reactotron-react-native';
import { useIsFocused } from '@react-navigation/native'

const useGetMovieByIdParalel = (movieIds: string[]) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const isFocused = useIsFocused();
  const movieIdsKey = JSON.stringify(movieIds ?? [])
  const memoizedIds = useMemo(() => JSON.parse(movieIdsKey) as string[], [movieIdsKey]);

  const queryResults = useQueries({
    queries: memoizedIds.map((id) => ({
      queryKey: ['transaction', id],
      queryFn: () => fetchMovieById(id),
      enabled: queryClient.getQueryData(['transaction', id]) === undefined,
      staleTime: 5 * 60 * 1000, // Keep data fresh to stop unwanted background fetches
      subscribed: isFocused
    }))
  })

  const resultVersion = `${movieIds.join(',')}|${queryResults.map(item => item.dataUpdatedAt).join(',')}`
  const lastDispatchedVersion = useRef<string | null>(null)
  const allFinished = queryResults.every(item => item.isSuccess && item.data !== undefined)

  useEffect(() => {
    if (
      queryResults.length === 0 ||
      !allFinished ||
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
      console.log('in main query2 ....')
      let sortedByRating = sortByImdbRating(movies)
      sortedByRating = sortedByRating?.reverse()?.slice(0, 10)

      let sortedByReleaseDate = sortByDateReleaseDate(movies)
      sortedByReleaseDate = sortedByReleaseDate?.slice(0, 10)

      dispatch(loadExtendedMovies(movies))
      dispatch(sortMovieByRatings(sortedByRating))
      dispatch(sortByRelease(sortedByReleaseDate))
    }

  }, [allFinished, dispatch])

  return queryResults
}

export default useGetMovieByIdParalel;