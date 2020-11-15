import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, Switch } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, ContextProps } from '../../contexts/auth';

const Home: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useContext(AuthContext) as ContextProps;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{`Bem vindo, ${user?.name}. 😄`}</Text>
        <Text style={styles.description}>Leve sua doação até um ponto de coleta ou:</Text>

        <Button
          text="Solicite a busca"
          onPress={() => navigation.navigate('Donation')}
        />

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -8.028449,
              longitude: -34.907337,
              longitudeDelta: 0.014,
              latitudeDelta: 0.014,
            }}
          >
            <Marker
              coordinate={{
                latitude: -8.028449,
                longitude: -34.907337,
              }}
            >
              <Image source={require('../../images/logo_red_icon.png')} />
            </Marker>

            <Marker
              coordinate={{
                latitude: -8.026224,
                longitude: -34.910846,
              }}
              style={styles.mapMarker}
            >
              <Image source={require('../../images/logo_red_icon.png')} />
            </Marker>

            <Marker
              coordinate={{
                latitude: -8.028518,
                longitude: -34.908893,
              }}
              style={styles.mapMarker}
            >
              <Image source={require('../../images/logo_red_icon.png')} />
            </Marker>
          </MapView>
        </View>
      </View>

    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: '#fff'
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    width: 90,
    height: 80,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },
  title: {
    color: '#000',
    fontSize: 30,
    maxWidth: 330,
    marginTop: 30,
  },
  description: {
    color: '#e63946',
    fontSize: 18,
    marginTop: 16,
    maxWidth: 260,
    lineHeight: 24,
    fontWeight: "bold",
  },
  footer: {},
  select: {},
  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
});