import { useMemo } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import useGetMovies from '../hooks/useGetMovies';
import useGetMovieByIdParalel from '../hooks/useGetMovieByIdParalel'
import MovieList from '../components/MovieList';

const MainScreen = ({ route }: { route: { params: { type: 'string'; searchFor: 'string' } } }) => {
  const type = route?.params?.type
  const searchFor = route?.params?.searchFor
  const movies = useSelector((state: any) => state.movies.movies)
  const mostScored = useSelector((state: any) => state.sortedMovies.mostScored)
  const latest = useSelector((state: any) => state.sortedMovies.latestMovies)

  const label = useMemo(() => {
    if (type === 'series') {
      return 'All Series'
    } else {
      return 'All Movies'
    }
  }, [type])
  const moviesIds = useMemo(() => movies?.map((item: any) => item.imdbID), [movies?.length])
  const { isPending, error } = useGetMovies(searchFor || 'all', type || 'movie')
  const queries = useGetMovieByIdParalel(moviesIds)

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.menuItem}>Someting went wrong when retrieving data...</Text>
      </View>
    )
  }

  console.log('Sorted', mostScored)
  return (
    <ScrollView style={styles.container}>
      <MovieList name='Best Scored' list={mostScored} loading={isPending} />
      <MovieList name="Latest Movies" list={latest} loading={isPending} />
      <MovieList name={label} list={movies} loading={isPending} />
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