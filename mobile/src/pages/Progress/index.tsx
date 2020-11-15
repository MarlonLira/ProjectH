import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import Button from '../../components/Button';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import blue from '../../animations/blue.json';
import green from '../../animations/green.json';
import pink from '../../animations/pink.json';
import red from '../../animations/red.json';
import yellow from '../../animations/yellow.json';
import win from '../../animations/win.json';

const Progress: React.FC = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.textDescription}>Você está no ranking: PRATA</Text>
      <ScrollView contentContainerStyle={styles.body} horizontal showsHorizontalScrollIndicator={false}>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textStatus}>Cobre</Text>
          <Lottie source={blue} autoPlay loop autoSize resizeMode="contain" style={{ width: 200, height: 200 }} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textStatus}>Prata</Text>
          <Lottie source={green} autoPlay loop autoSize resizeMode="contain" style={{ width: 200, height: 200 }} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textStatus}>Ouro</Text>
          <Lottie source={yellow} autoPlay loop autoSize resizeMode="contain" style={{ width: 200, height: 200 }} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Lottie source={win} autoPlay loop autoSize resizeMode="contain" style={{ width: 400, height: 300 }} />
        </View>

      </ScrollView>

      <Text style={styles.textTitleBenefits}>Benefícios para o ranking:</Text>
      <Text style={styles.textBenefits}>*5% de desconto em toda a loja* 😍</Text>

      <Text style={styles.text}>Para evoluir ainda mais e conquistar diversos benefícios:</Text>

      <View style={{width: '100%', paddingHorizontal: 32}}>
        <Button text="Faça mais doações" onPress={() => navigation.navigate('Donation')} />
      </View>

      <Text style={[styles.text, { fontSize: 18 }]}>OU</Text>

      <Text style={{marginBottom: 15. }}>Realize compras no App da Renner</Text>
    </SafeAreaView>
  );
}

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStatus: {
    fontSize: 25
  },
  textDescription: {
    fontSize: 25,
    paddingTop: 70, 
  },
  textTitleBenefits: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e63946',
  },
  textBenefits: {
    fontSize: 20,
  },
  text: {
    marginTop: 15
  }
})
