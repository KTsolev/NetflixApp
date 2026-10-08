import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import useGetMovies from '../hooks/useGetMovies';
import MovieList from '../components/MovieList';

const MainScreen = ({ route }: { route: { params: { type: any; searchFor: any } } }) => {
  const type = route.params.type
  const searchFor = route.params.searchFor

  const movies = useSelector((state: any) => state.movies.movies)
  const { isPending, error } = useGetMovies(searchFor, type)

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.menuItem}>Someting went wrong when retrieving data...</Text>
      </View>
    )
  }

  console.log('movies', movies);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MovieList name="Popular Movies" list={movies} loading={isPending} />
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
  menuItem: {
    color: '#e8e8e8',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
});