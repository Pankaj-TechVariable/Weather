import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
