import { StyleSheet, Text, FlatList } from 'react-native';
import type { RatingsType } from '../types/DataTypes'
import { isRatings } from '../helpers/typeHelpers';
import { v4 as uuidv4 } from "uuid"
import 'react-native-get-random-values';

const RenderMenuItem = ({ list }: { list: (string | RatingsType)[] }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={() => uuidv4()}
      renderItem={({ item }) => {
        const rating = isRatings(item) ? `${item.Source}: ${item.Value}` : item;

        return <Text style={styles.menuItem}>{rating}</Text>
      }}
    />
  );
}

const styles = StyleSheet.create({
  menuItem: {
    color: '#e8e8e8',
    fontSize: 16,
    textAlign: 'right',
    lineHeight: 18,
    fontWeight: 'bold',
  },
});

export default RenderMenuItem