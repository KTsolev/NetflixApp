import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App

