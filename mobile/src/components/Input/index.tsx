import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export interface Props {
  placeholder: string;
  onChangeText?: (text: string) => void;
  onEndEditing?: () => void;
  maxLength?: number;
  secureTextEntry?: boolean;
}

const Input: React.FC<Props> = (props) => {
  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor="#666666"
        autoCapitalize="none"
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        maxLength={props.maxLength}
        style={styles.text}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 30,
    width: '100%'
  },
  text: {
    padding: 10,
  }
});