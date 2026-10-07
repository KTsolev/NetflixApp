
import { StyleSheet, Text, View, FlatList } from 'react-native';
import type { RecordType } from '../types/DataTypes'
import ListItem from './ListItem';

const MovieList = ({ name, list }: { name: string; list: RecordType[] }) => {

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerItem}>{name}</Text>
        <FlatList
          data={list}
          horizontal
          keyExtractor={(item, index) => String(item?.imdbID || index)}
          renderItem={({ item }) => (
            <ListItem movie={item} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    marginTop: 40
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
