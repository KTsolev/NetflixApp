import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import type { RecordType } from '../types/DataTypes'
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ movie }: { movie: RecordType }) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate('Details', { movieId: movie?.imdbID });
  }

  return (
    <TouchableOpacity style={styles.movieContainer} onPress={handlePress}>
      <Image source={{ uri: movie?.Poster }} style={styles.movieImage} resizeMode="contain" />
      <View style={styles.movieDetailsContainer}>
        <Text style={styles.menuItem}>{movie?.Title}</Text>
        <Text style={styles.menuItem}>{movie?.Year}</Text>
        <Text style={styles.menuItem}>{movie?.Type}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  movieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 350,
    borderColor: '#e8e8e8',
    paddingVertical: 10,
    borderWidth: 1,
  },
  movieImage: {
    width: 250,
    height: 250,
  },
  menuItem: {
    color: '#e8e8e8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
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
    alignItems: 'center',
    paddingTop: 10,
  }
});

export default ListItem