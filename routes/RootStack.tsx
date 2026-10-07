import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default RootStack;