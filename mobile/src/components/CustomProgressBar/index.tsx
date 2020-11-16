import React from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';

export interface Props {
  visible: boolean
}

const CustomProgressBar: React.FC<Props> = (props) => {
  return (
    <Modal onRequestClose={() => null} visible={props.visible}>
      <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
          <Text style={{ fontSize: 15, fontWeight: '200', marginBottom: 15 }}>Carregando</Text>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </View>
    </Modal>
  );
}

export default CustomProgressBar;