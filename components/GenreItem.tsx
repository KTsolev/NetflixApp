
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useParamsContext } from '../redux/contexts/paramsContext'

type GenreItemProps = {
  item: string;
  index: number;
  clbk: () => void
};

type HeaderParams = {
  Home: { type: string; searchFor: string };
};

const GenreItem = ({ item, index, clbk }: GenreItemProps) => {
  const { params, setParams } = useParamsContext()
  const navigation = useNavigation<NavigationProp<HeaderParams>>();

  const handlePress = () => {
    setParams({
      ...params,
      genre: item
    })
    navigation.navigate('Home')
    clbk()
  }

  return (
    <TouchableOpacity key={index} onPress={handlePress}>
      <Text key={index} style={styles.menuItem}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    color: '#e8e8e8',
    fontSize: 18,
    lineHeight: 22,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontWeight: 'bold',
  },
})

export default GenreItem