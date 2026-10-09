
import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { Genres } from '../types/DataTypes'
import debounce from 'lodash.debounce'
import { useParamsContext } from '../redux/contexts/paramsContext'
import GenreItem from '../components/GenreItem'
type MenuHeaderParams = {
  Home: { type: string; searchFor: string };
};

const genres = Object.keys(Genres).filter(key => isNaN(Number(key)))

const MenuHeader = () => {
  const { params, setParams } = useParamsContext()
  const [showInput, setShowInput] = useState(false)
  const [showGenres, setShowGenres] = useState(false)
  const [text, setText] = useState('');
  const navigation = useNavigation<NavigationProp<MenuHeaderParams>>();

  const goHome = () => {
    setParams({
      type: 'movie',
      searchFor: 'all',
      genre: 'Comedy'
    })
    navigation.navigate('Home');
  };

  const loadSeries = () => {
    setParams({
      type: 'series',
      searchFor: 'all',
      genre: 'Comedy'
    })
    navigation.navigate('Home');
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      if (!query) return;
      if (query?.length < 2) return;

      setParams({
        ...params,
        searchFor: query
      })
      navigation.navigate('Home');
    }, 500), // 500ms delay
    []
  );

  const handleChangeText = (value: string) => {
    setText(value);
    debouncedFetch(value);
  };

  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerItem}>Netflix</Text>
          <TouchableHighlight onPress={goHome}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={loadSeries}>
            <Text style={styles.menuItem}>Series</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{ position: 'relative', overflow: 'visible', zIndex: 10 }} onPress={() => setShowGenres(!showGenres)}>
            <View>
              <Text style={styles.menuItem}>Genres</Text>
              {showGenres && <FlatList
                data={genres}
                style={styles.genresList}
                renderItem={({ item, index }) => <GenreItem item={item} index={index} clbk={() => setShowGenres(false)} />}
              />}
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setShowInput(!showInput)}>
            <Text style={styles.menuItem}>Search</Text>
          </TouchableHighlight>
        </View>
      </View>
      {showInput && <TextInput placeholder='Search...' style={styles.input} value={text} onChangeText={handleChangeText} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingHorizontal: 20,
    marginTop: 8,
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  genresList: {
    position: 'absolute',
    top: 28,
    left: 0,
    zIndex: 999,
    minWidth: 130,
    backgroundColor: '#282828d8'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItem: {
    color: '#e8e8e8',
    fontSize: 18,
    lineHeight: 22,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontWeight: 'bold',
  },
  input: {
    color: '#030303',
    backgroundColor: '#fbf7f7',
    borderColor: '#fbf7f7',
    marginHorizontal: 20,
    borderWidth: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  headerItem: {
    color: '#800101',
    fontSize: 24,
    lineHeight: 26,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});
export default MenuHeader
