import React from 'react';
import {View, TextInput, ActivityIndicator} from 'react-native';
import styles from './inputText.styles';

const InputText = ({options, left, right, isLoading}) => {
  return (
    <View style={styles.container}>
      {left}
      <TextInput {...options} style={styles.inputText} />
      {isLoading ? <ActivityIndicator /> : right}
    </View>
  );
};

export default InputText;
