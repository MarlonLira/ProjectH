import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Lottie from 'lottie-react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { AuthContext, ContextProps } from '../../contexts/auth';

import blue from '../../animations/blue.json';
import green from '../../animations/green.json';
import yellow from '../../animations/yellow.json';
import win from '../../animations/win.json';

const Progress: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useContext(AuthContext) as ContextProps;

  const [ranking, setRanking] = useState('');
  const [score, setScore] = useState('');

  const [bronze, setBronze] = useState(false);
  const [silver, setSilver] = useState(false);
  const [gold, setGold] = useState(false);
  const [platinum, setPlatinum] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function get() {

      try {

        const response = await api.get(`/user/${user.id}`);

        setScore(response.data.result.score);

        switch (response.data.result.rank.name) {
          case 'Bronze':
            setRanking('Bronze');
            setBronze(true);
            break;
          case 'Silver':
            setRanking('Prata');
            setSilver(true);
            break;
          case 'Gold':
            setRanking('Ouro');
            setGold(true);
            break;
          case 'Platinum':
            setRanking('Platina');
            setPlatinum(true);
            break;
        }

        setLoading(false);

      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
      }
    }
    get();
  }, []);

  return (
    <>
      {loading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
        :
        <SafeAreaView style={styles.container} >

          <View style={styles.rank} >
            <Text style={styles.textDescription}>Ranking: {ranking} </Text>
            <Text style={styles.textDescription}> Score: {score} </Text>
          </View>

          <ScrollView contentContainerStyle={styles.body} horizontal showsHorizontalScrollIndicator={false}>

            <View style={[{ alignItems: 'center' }, bronze ? styles.selected : null]}>
              <Text style={styles.textStatus}>Bronze</Text>
              <Lottie source={blue} autoPlay loop autoSize resizeMode="contain" style={{ width: 200, height: 200 }} />
            </View>

            <View style={[{ alignItems: 'center' }, silver ? styles.selected : null]}>
              <Text style={styles.textStatus}>Prata</Text>
              <Lottie source={green} autoPlay loop autoSize resizeMode="contain" style={{ width: 200, height: 200 }} />
            </View>

            <View style={[{ alignItems: 'center' }, gold ? styles.selected : null]}>
              <Text style={styles.textStatus}>Ouro</Text>
              <Lottie source={yellow} autoPlay loop autoSize resizeMode="contain" style={{ width: 200, height: 200 }} />
            </View>

            <View style={[{ alignItems: 'center' }, platinum ? styles.selected : null]}>
              <Lottie source={win} autoPlay loop autoSize resizeMode="contain" style={{ width: 400, height: 300 }} />
            </View>

          </ScrollView>

          <Text style={styles.textTitleBenefits}>Benefícios para o ranking:</Text>
          <Text style={styles.textBenefits}>*5% de desconto em toda a loja*</Text>

          <Text style={styles.text}>Para evoluir ainda mais e conquistar diversos benefícios:</Text>

          <View style={{ width: '100%', paddingHorizontal: 32 }}>
            <Button text="Faça mais doações" onPress={() => navigation.navigate('Donation')} />
          </View>

          <Text style={[styles.text, { fontSize: 18 }]}>OU</Text>

          <Text style={{ marginBottom: 15. }}>Realize compras no App da Renner</Text>

        </SafeAreaView>
      }
    </>
  );
}

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  rank: {
    alignItems: 'center',
    paddingTop: 70,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  textStatus: {
    fontSize: 25
  },
  textDescription: {
    fontSize: 23,
    maxWidth: 330,
  },
  textTitleBenefits: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e63946',
  },
  textBenefits: {
    fontSize: 18,
  },
  text: {
    marginTop: 15
  },
  selected: {
    borderWidth: 1,
    borderColor: '#e63946',
    borderRadius: 30
  }
})
