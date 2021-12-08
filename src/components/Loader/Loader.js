import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
