import { StyleSheet, Text, View } from 'react-native';
import useGetMovieById from '../hooks/useGetMivieById';
import DetailsItem from '../components/DetailsItem';
import { isMovie } from '../helpers/typeHelpers';

const DetailsScreen = ({ route }: { route: any }) => {
  const { movieId } = route.params;
  const { isPending, data: movie, error } = useGetMovieById(movieId);
  const movieIsMovie = isMovie(movie);

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

  return (
    <View style={styles.container}>
      <DetailsItem movie={movie} isMovie={movieIsMovie} />
    </View>
  );
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
});