import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ButtonGoBack from '../../components/ButtonGoBack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

const Register: React.FC = () => {

  const [registryCode, setregistryCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(true);

  const navigation = useNavigation();
  const { signUp } = useContext(AuthContext);
 
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
      gender: "M",
    }

    signUp(user);
  };

  return (
    <>
      <ButtonGoBack onPress={() => navigation.goBack()} />

      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Cadastro</Text>
        <Text>Preencha os dados para fazer seu cadastro</Text>
        <Input
          placeholder="CPF"
          onChangeText={(text) => setregistryCode(text)}
          maxLength={11}
        />
        <Input
          placeholder="Nome"
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Senha"
          onChangeText={(text) => setPassword(text)}
          maxLength={6}
        />
        <Button
          text="Cadastrar"
          onPress={handlerButton}
          disabled={validate}
        />

      </SafeAreaView>
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
    justifyContent: 'center'
  },
  text: {
    fontSize: 25,
  },
  icon: {
    margin: 25
  }
});