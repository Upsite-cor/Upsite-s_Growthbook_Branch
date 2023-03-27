/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './redux/stores/store';
import ApplicationNavigator from './navigators/Application';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ApplicationNavigator></ApplicationNavigator>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
