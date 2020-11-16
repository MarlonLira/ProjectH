import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ButtonGoBack from '../../components/ButtonGoBack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, ContextProps } from '../../contexts/auth';

import Lottie from 'lottie-react-native';
import Animate from '../../animations/user.json';
import { Picker } from '@react-native-community/picker';

const Register: React.FC = () => {

  const [registryCode, setregistryCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(true);
  const [gender, setGender] = useState('');

  const navigation = useNavigation();
  const { signUp, loadingLogin } = useContext(AuthContext) as ContextProps;

  useEffect(() => {
    if (registryCode.length == 11 && name != '' && email != '' && password != '') {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [registryCode, name, email, password]);

  const handlerButton = async () => {

    let user = {
      registryCode: registryCode,
      name: name,
      email: email,
      password: password,
      gender: gender,
    }

    signUp(user);
  };

  return (
    <>
      {!loadingLogin ? <ButtonGoBack onPress={() => navigation.goBack()}/> : null }
      {loadingLogin ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false} >

          <SafeAreaView style={styles.container}>

            <View style={{ alignItems: "center", marginTop: -80 }} >
              <Lottie source={Animate} autoPlay loop autoSize resizeMode="contain" style={{ width: 400, height: 300 }} />
            </View>

            <Text style={styles.text}>Cadastro</Text>
            <Text>Preencha os dados para fazer seu cadastro</Text>

            <Input
              placeholder="Nome"
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="CPF"
              onChangeText={(text) => setregistryCode(text)}
              maxLength={11}
            />
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Senha"
              onChangeText={(text) => setPassword(text)}
              maxLength={6}
              secureTextEntry={true}
            />

            <View style={styles.category}>
              <Text style={styles.labelPicker}>Gênero</Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue.toString())}
                mode='dialog'
                style={styles.picker}
              >
                <Picker.Item value={""} label="" />
                <Picker.Item value={"M"} label="Masculino" />
                <Picker.Item value={"F"} label="Feminino" />
                <Picker.Item value={"NA"} label="Prefiro não informar" />
              </Picker>
            </View>

            <Button
              text="Cadastrar"
              onPress={handlerButton}
              disabled={validate}
            />

          </SafeAreaView>
        </ScrollView>
      }
    </>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 30
  },
  text: {
    fontSize: 25,
  },
  icon: {
    margin: 25
  },
  category: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%'
  },
  labelPicker: {
    marginTop: 30,
  },
  picker: {
    width: '100%'
  },
});