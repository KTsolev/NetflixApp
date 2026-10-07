import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MenuHeader from './components/MenuHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
const queryClient = new QueryClient();

if (__DEV__) {
  require("./ReactotronConfig");
}

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1, borderColor: '#e8e8e8', borderWidth: 1, backgroundColor: '#141414' }} >
            <MenuHeader />
            <RootStack />
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

export default App

