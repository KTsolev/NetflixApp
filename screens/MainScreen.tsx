import { useMemo } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import useGetMovies from '../hooks/useGetMovies';
import useGetMovieByIdParalel from '../hooks/useGetMovieByIdParalel'
import MovieList from '../components/MovieList';
import { FilmType } from '../types/DataTypes'
import { useParamsContext } from '../redux/contexts/paramsContext'

const MainScreen = () => {
  const { params } = useParamsContext()
  const type = params.type
  const searchFor = params.searchFor
  const genre = params.genre


  const movies = useSelector((state: any) => state.movies.movies)
  const moviesDetails = useSelector((state: any) => state.movies.extendedMovies)

  const mostScored = useSelector((state: any) => state.sortedMovies.mostScored)
  const latest = useSelector((state: any) => state.sortedMovies.latestMovies)

  const label = useMemo(() => {
    if (type === 'series') {
      return 'Series'
    } else {
      return 'Movies'
    }
  }, [type])

  const filteredByGenre = useMemo(() => moviesDetails?.filter((item: FilmType) => item.Genre === genre || item.Genre.includes(genre)), [moviesDetails, genre])
  const moviesIds = useMemo(() => movies?.map((item: FilmType) => item.imdbID), [movies?.length])
  const { isPending, error } = useGetMovies(searchFor || 'all', type || 'movie')
  const queries = useGetMovieByIdParalel(moviesIds)

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.menuItem}>Someting went wrong when retrieving data...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <MovieList name={`By ${genre}`} list={filteredByGenre} loading={isPending} />
      <MovieList name='Best Scored' list={mostScored} loading={isPending} />
      <MovieList name={`Latest ${label}`} list={latest} loading={isPending} />
      <MovieList name={`All ${label}`} list={movies} loading={isPending} />
    </ScrollView>
  );
}

export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingBottom: 60
  },
  menuItem: {
    color: '#e8e8e8',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
});