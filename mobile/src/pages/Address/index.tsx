import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ButtonGoBack from '../../components/ButtonGoBack';

import { useNavigation, StackActions } from '@react-navigation/native';
import { AuthContext, ContextProps } from '../../contexts/auth';
import axios from 'axios';
import api from '../../services/api';

const Address: React.FC = () => {

  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [complement, setComplement] = useState('');
  const [validate, setValidate] = useState(true);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { user } = useContext(AuthContext) as ContextProps;


  useEffect(() => {
    async function getAddress() {
      setLoading(true);
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);

        setStreet(response.data.logradouro);
        setCity(response.data.localidade);
        setState(response.data.uf);
        setCountry('BR');

        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    if (zipcode.length == 8) {
      getAddress();
    };
  }, [zipcode]);

  useEffect(() => {

    if (zipcode != '' && street != '' && number != '' && city != '' && state != '' && country != '' && complement != '') {
      setValidate(false);
    } else {
      setValidate(true);
    }

  }, [zipcode,
    street,
    number,
    city,
    state,
    country,
    complement,]);

  useEffect(() => {
    async function get() {

      try {
        const response = await api.get(`/user/${user.id}`);

        if (typeof response.data.result.address?.street != "undefined" && typeof response.data.result.address.number != "undefined") {
          setStreet(response.data.result.address.street);
          setCity(response.data.result.address.city);
          setState(response.data.result.address.state);
          setCountry(response.data.result.address.country);
          setNumber(response.data.result.address.number);
          setZipcode(response.data.result.address.zipcode);
          setComplement(response.data.result.address.complement);
        }

        setLoading(false);

      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    }
    get();
  }, []);

  const save = async () => {

    setLoading(true);

    var data = {
      zipcode: zipcode,
      street: street,
      number: number,
      city: city,
      state: state,
      country: country,
      complement: complement,
      userId: user.id
    }

    try {
      const response = await api.post('/address', data);
      alert('Cadastro realizado!!');
      navigation.dispatch(StackActions.popToTop());
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  return (
    <>
      <ButtonGoBack onPress={() => navigation.goBack()} />

      {loading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
        :
        <ScrollView style={styles.container}>

          <Input
            placeholder="CEP"
            onChangeText={(text) => setZipcode(text)}
            value={zipcode}
            maxLength={8}
          />
          <Input
            placeholder="Rua"
            onChangeText={(text) => setStreet(text)}
            value={street}
          />
          <Input
            placeholder="Número"
            onChangeText={(text) => setNumber(text)}
            value={number}
          />
          <Input
            placeholder="Cidade"
            onChangeText={(text) => setCity(text)}
            value={city}
          />
          <Input
            placeholder="Estado"
            onChangeText={(text) => setState(text)}
            value={state}
          />
          <Input
            placeholder="País"
            onChangeText={(text) => setCountry(text)}
            value={country}
          />
          <Input
            placeholder="Complemento"
            onChangeText={(text) => setComplement(text)}
            value={complement}
          />

          <Button
            onPress={save}
            text="Salvar"
            disabled={validate}
          />
        </ScrollView>
      }
    </>
  );
}

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 32,
  }
});