import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/navigation/AppNavigation';
import DrawerTabs from './src/navigation/DrawerTabs';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigation';
const App = () => {
  return (
      <Provider store={store}>
      <NavigationContainer>
        <DrawerTabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
