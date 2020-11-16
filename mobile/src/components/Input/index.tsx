import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  onEndEditing?: () => void;
  maxLength?: number;
  secureTextEntry?: boolean;
  label?: string;
  value?: string;
}

const Input: React.FC<Props> = (props) => {
  return (
    <View style={styles.textInput}>
      {props.label ? <Text>{props.label}</Text> : null}
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor="#666660"
        autoCapitalize="none"
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        maxLength={props.maxLength}
        style={styles.text}
        secureTextEntry={props.secureTextEntry}
        value={props.value}
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