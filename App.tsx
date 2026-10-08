import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native'
import { store } from './redux/store';
import MenuHeader from './components/MenuHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamsProvider } from './redux/contexts/paramsContext'
const queryClient = new QueryClient();

if (__DEV__) {
  require("./ReactotronConfig");
}

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaView style={styles.container} >
            <ParamsProvider>
              <MenuHeader />
              <RootStack />
            </ParamsProvider>
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#141414'
  }
})

export default App

