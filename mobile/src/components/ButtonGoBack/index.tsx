import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

export interface Props {
  onPress: () => void;
}

const ButtonGoBack: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.icon} onPress={props.onPress}>
      <Icon name="arrow-left" size={20} color="#000" />
    </TouchableOpacity>
  );
}

export default ButtonGoBack;

const styles = StyleSheet.create({
  icon: {
    margin: 25
  },
})