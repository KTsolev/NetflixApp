
import { StyleSheet, Text, View, FlatList } from 'react-native';
import type { RecordType } from '../types/DataTypes'
import ListItem from './ListItem';
import Skeleton from './Skeleton';

const MovieList = ({ name, list, loading }: { name: string; list: RecordType[], loading: boolean }) => {
  const array = Array.from([1, 2, 3, 4, 5, 6, 7, 8])
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerItem}>{name}</Text>
        {loading && <FlatList
          data={array}
          horizontal
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <Skeleton style={styles.movieContainer} />
          )}
        />}
        {!loading && <FlatList
          data={list}
          horizontal
          ListEmptyComponent={() => <Text style={styles.headerItem}>No items...</Text>}
          keyExtractor={(item, index) => String(item?.imdbID || index)}
          renderItem={({ item }) => (
            <ListItem movie={item} />
          )}
        />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'flex-start',
    marginBottom: 40
  },
  innerContainer: {
    flex: 1,
    marginTop: 20
  },
  movieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    height: 200,
    marginRight: 10,
    borderColor: '#e8e8e8',
    paddingVertical: 10,
    borderWidth: 1,
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
});
export default MovieList
