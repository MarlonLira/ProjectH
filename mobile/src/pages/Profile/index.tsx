import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/auth';

const Profile: React.FC = () => {

  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container} >
      <View style={styles.infoProfile}>
        <View style={styles.userInfoSection}>
          <View style={styles.startView}>
            <Image
              source={require('../../images/avatar.png')}
              style={styles.image}
            />
            <View>
              <Text style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{user.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name='map-pin' style={styles.colorOptional} size={20} />
            <Text style={[styles.colorOptional, { marginLeft: 20 }]} > R. Guimarães peixoto, 159 </Text>
          </View>
          <View style={styles.row}>
            <Icon name='phone' style={styles.colorOptional} size={20} />
            <Text style={[styles.colorOptional, { marginLeft: 20 }]}> 81 9 8225-1528 </Text>
          </View>
          <View style={styles.row}>
            <Icon name='mail' style={styles.colorOptional} size={20} />
            <Text style={[styles.colorOptional, { marginLeft: 20 }]} > {user.email} </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Icon name="map" size={19} />
        <Text style={styles.textButton} >Endereço</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="edit-3" size={19} />
        <Text style={styles.textButton} >Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="key" size={19} />
        <Text style={styles.textButton} >Meus tokens</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        <Icon name="log-out" size={19} />
        <Text style={styles.textButton} >Sair</Text>
      </TouchableOpacity>
    </View>
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