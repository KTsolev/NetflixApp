
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const MenuHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerItem}>Netflix</Text>
        <TouchableHighlight>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.menuItem}>Series</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.menuItem}>Genres</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={styles.menuItem}>Search</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: '#141414',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50
  },
  menuItem: {
    color: '#e8e8e8',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  headerItem: {
    color: '#800101',
    fontSize: 24,
    lineHeight: 28,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});
export default MenuHeader
