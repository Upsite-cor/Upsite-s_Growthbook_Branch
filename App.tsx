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


function App(): JSX.Element {
  return (
    <NavigationContainer>
        <SafeAreaView>
      <Text>Growthbook</Text>
    </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
