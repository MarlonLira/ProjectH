import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Progress: React.FC = () => {
  return (
    <View style={styles.container} >
      <Text>Progress</Text>
    </View>
  );
}

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
})