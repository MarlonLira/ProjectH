import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttoon, props.disabled ? {opacity: 0.3} : null]}
      activeOpacity={0.6}
      disabled={props.disabled}
      >
      <Text style={styles.textButton}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttoon: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    width: '100%'
  },
  textButton: {
    color: '#fff',
  },
})