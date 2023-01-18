/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { HomeScreen } from './screens/mainApp/HomeScreen';


function App(): JSX.Element {
  return (
    <NavigationContainer>
        <SafeAreaView>
        <HomeScreen></HomeScreen>
    </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
