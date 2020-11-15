import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Buttom from '../../components/Button';
import { AuthContext, ContextProps } from '../../contexts/auth';

const Login = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();
  const { signIn, loadingLogin } = useContext(AuthContext) as ContextProps;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(true);

  useEffect(() => {
    if (email != '' && password != '') {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [email, password])

  const handlerButton = () => {
    signIn(email, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      {loadingLogin ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View> 
        :
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Olá :)</Text>
          <Text style={styles.subTitle}>Acesse sua conta.</Text>

          <View>
            <Input
              placeholder="Insira seu e-mail"
              onChangeText={text => setEmail(text)}
            />
            <Input
              placeholder="Digite sua senha"
              onChangeText={text => setPassword(text)}
            />
            <Buttom
              text="Entrar"
              onPress={handlerButton}
              disabled={validate}
            />

            <Text style={styles.textPass}>Esqueci minha senha</Text>

            <View style={styles.access}>
              <Switch
                trackColor={{ false: "#767577", true: "#9EE5DD" }}
                thumbColor={isEnabled ? "#5ED4C6" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text>Lembrar meu acesso</Text>
            </View>

            <View style={styles.register}>
              <Text>Novo por aqui?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.5}>
                <Text style={styles.registerText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 25,
  },
  textPass: {
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  access: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scroll: {
    marginTop: 70,
    flex: 1
  },
  register: {
    marginTop: 50,
    flexDirection: 'row',
  },
  registerText: {
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
    fontSize: 16
  }
});