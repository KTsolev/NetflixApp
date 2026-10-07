import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import useGetMovies from '../hooks/useGetMovies';
import MovieList from '../components/MovieList';

const MainScreen = () => {
  const movies = useSelector((state: any) => state.movies.movies)
  const { isPending, error } = useGetMovies('all')

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  console.log('movies', movies);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Main Screen Netflix app</Text>
      <MovieList name="Popular Movies" list={movies} />
    </ScrollView>
  );
}

export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
});