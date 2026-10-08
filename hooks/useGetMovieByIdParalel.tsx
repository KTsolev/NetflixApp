import { useEffect, useRef } from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchMovieById } from '../services/api';
import { useDispatch } from 'react-redux'
import { loadExtendedMovies } from '../redux/reducers/moviesReducer'
import { sortByImdbRating, sortByDateReleaseDate } from '../helpers/arrayHelpers'
import { sortMovieByRatings, sortByRelease } from '../redux/reducers/filteredMoviesReducer'
import reactotron from 'reactotron-react-native';

const useGetMovieByIdParalel = (movieIds: string[]) => {
  const dispatch = useDispatch()

  // Current page query
  const queryResults = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ['movieId', id],
      queryFn: () => fetchMovieById(id)
    }))
  })

  const resultVersion = `${movieIds.join(',')}|${queryResults.map(item => item.dataUpdatedAt).join(',')}`
  const lastDispatchedVersion = useRef<string | null>(null)

  useEffect(() => {
    if (
      queryResults.length === 0 ||
      !queryResults.every(item => item.isSuccess && item.data !== undefined) ||
      resultVersion === lastDispatchedVersion.current
    ) {
      return
    }

    lastDispatchedVersion.current = resultVersion
    const movies = queryResults.map(item => item.data!)
    let sortedByRating = sortByImdbRating(movies)
    sortedByRating = sortedByRating?.reverse()?.slice(0, 10)

    let sortedByReleaseDate = sortByDateReleaseDate(movies)
    sortedByReleaseDate = sortedByReleaseDate?.slice(0, 10)

    reactotron?.display?.({
      name: 'TRON',
      preview: 'sorted',
      value: {
        sortedByRating,
        sortedByReleaseDate
      },
    })

    dispatch(loadExtendedMovies(movies))
    dispatch(sortMovieByRatings(sortedByRating))
    dispatch(sortByRelease(sortedByReleaseDate))

  }, [queryResults, resultVersion, dispatch])

  return queryResults
};

export default useGetMovieByIdParalel;