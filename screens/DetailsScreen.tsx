import { StyleSheet, Text, View } from 'react-native';
import useGetMovieById from '../hooks/useGetMovieById';
import DetailsItem from '../components/DetailsItem';
import { isMovie } from '../helpers/typeHelpers';
import Skeleton from '../components/Skeleton'

const DetailsScreen = ({ route }: { route: any }) => {
  const { movieId } = route.params;
  const { isPending, data: movie, error } = useGetMovieById(movieId);
  const movieIsMovie = isMovie(movie);

  if (isPending) {
    return (
      <View style={styles.container}>
        <Skeleton style={styles.movieContainer} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.menuItem}>Someting went wrong when retrieving data...</Text>
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
  movieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e8e8e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  menuItem: {
    color: '#e8e8e8',
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 24,
    fontWeight: 'bold',
  },
});