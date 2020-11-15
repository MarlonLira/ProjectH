import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { AuthContext, ContextProps } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const Profile: React.FC = () => {

  const { user, signOut } = useContext(AuthContext) as ContextProps;
  const navigation = useNavigation();
  const [ranking, setRanking] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function get() {

      try {
        const response = await api.get(`/user/${user.id}`);

        switch (response.data.result.rank.name) {
          case 'Bronze':
            setRanking('Bronze');
            break;
          case 'Silver':
            setRanking('Prata');
            break;
          case 'Gold':
            setRanking('Ouro');
            break;
          case 'Platinum':
            setRanking('Platina');
            break;
        }
        if (typeof response.data.result.address?.street != "undefined" && typeof response.data.result.address.number  != "undefined") {
          setAddress(`${response.data.result.address?.street}, ${response.data.result.address.number}`);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
          <View style={styles.infoProfile}>
            <View style={styles.userInfoSection}>
              <View style={styles.startView}>
                <Image
                  source={require('../../images/avatar.png')}
                  style={styles.image}
                />
                <View>
                  <Text style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{user?.name}</Text>
                </View>
              </View>
            </View>

            <View style={styles.userInfoSection}>

              <View style={styles.row}>
                <Icon name='award' style={styles.colorOptional} size={20} />
                <Text style={[styles.colorOptional, { marginLeft: 20 }]} >{ranking}</Text>
              </View>

              <View style={styles.row}>
                <Icon name='map-pin' style={styles.colorOptional} size={20} />
                <Text style={[styles.colorOptional, { marginLeft: 20 }]} >{address}</Text>
              </View>

              <View style={styles.row}>
                <Icon name='mail' style={styles.colorOptional} size={20} />
                <Text style={[styles.colorOptional, { marginLeft: 20 }]} > {user?.email} </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Address')}>
            <Icon name="map" size={19} />
            <Text style={styles.textButton} >Endereço</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Token')}>
            <Icon name="key" size={19} />
            <Text style={styles.textButton} >Meus tokens</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => signOut()}>
            <Icon name="log-out" size={19} />
            <Text style={styles.textButton} >Sair</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  infoProfile: {
    borderRadius: 15,
    backgroundColor: '#e63946',
    marginTop: 50,
    marginBottom: 20,
    elevation: 15,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  startView: {
    flexDirection: 'column',
    marginTop: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: "#fff"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorOptional: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButton: {
    marginVertical: 15,
    marginLeft: 15,
    fontSize: 19
  }
})