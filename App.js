import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.8)" />
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default App;
