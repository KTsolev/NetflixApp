
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import type { FilmType, MovieType, SeriesType } from '../types/DataTypes'
import RenderMenuItem from './RenderMenuItem';

const { width } = Dimensions.get('window');

const DetailsItem = ({ movie, isMovie }: { movie: FilmType; isMovie: boolean }) => {
  const actors = movie?.Actors?.split(',').map(actor => actor.trim());
  const genres = movie?.Genre?.split(',').map(genre => genre.trim());
  const writers = movie?.Writer?.split(',').map(writer => writer.trim());

  const renderBoxOffice = () => {
    if (isMovie) {
      const film = movie as MovieType;

      return (
        <>
          <View style={styles.row}>
            <Text style={styles.menuItem}>DVD:</Text>
            <Text style={styles.menuItem}>{film?.DVD}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.menuItem}>BoxOffice:</Text>
            <Text style={styles.menuItem}>{film?.BoxOffice}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.menuItem}>Website:</Text>
            <Text style={styles.menuItem}>{film?.Website}</Text>
          </View>
        </>
      );
    }

    const seriesMovie = movie as SeriesType;

    return (
      <View style={styles.row}>
        <Text style={styles.menuItem}>Total Seasons:</Text>
        <Text style={styles.menuItem}>{seriesMovie?.totalSeasons}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.coll}>
        <Text style={styles.menuItem}>{movie?.Title}</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.menuItem}>Year:</Text>
          <Text style={styles.menuItem}>{movie?.Year}</Text>
        </View>
      </View>
      <View style={styles.coll}>
        <Image source={{ uri: movie?.Poster }} style={styles.movieImage} resizeMode="contain" />
      </View>
      <View style={styles.movieDetailsContainer}>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Released:</Text>
          <Text style={styles.menuItem}>{movie?.Released}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Runtime:</Text>
          <Text style={styles.menuItem}>{movie?.Runtime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Genres:</Text>
          <RenderMenuItem list={genres || []} />
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Writer:</Text>
          <RenderMenuItem list={writers || []} />
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Actors:</Text>
          <RenderMenuItem list={actors || []} />
        </View>
        <View style={styles.coll}>
          <Text style={styles.menuItem}>Plot:</Text>
          <Text style={styles.menuItem}>{movie?.Plot}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Language:</Text>
          <Text style={styles.menuItem}>{movie?.Language}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Ratings:</Text>
          <RenderMenuItem list={movie?.Ratings || []} />
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>Metascore:</Text>
          <Text style={styles.menuItem}>{movie?.Metascore}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>imdbRating:</Text>
          <Text style={styles.menuItem}>{movie?.imdbRating}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.menuItem}>imdbVotes:</Text>
          <Text style={styles.menuItem}>{movie?.imdbVotes}</Text>
        </View>
        {renderBoxOffice()}
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  row: {
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  coll: {
    width: width - 40,
    alignItems: 'center',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  movieContainer: {
    flex: 1,
    borderColor: '#e8e8e8',
    borderWidth: 1,
  },
  movieImage: {
    width: 450,
    height: 450,
  },
  menuItem: {
    color: '#e8e8e8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: 'bold',
  },
  headerItem: {
    color: '#e8e8e8',
    fontSize: 18,
    lineHeight: 22,
    paddingBottom: 10,
    paddingLeft: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  movieDetailsContainer: {
    justifyContent: 'center',
  }
});

export default DetailsItem