import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { AuthContext, ContextProps } from '../../contexts/auth';
import api from '../../services/api';

import Input from '../../components/Input';
import Buttom from '../../components/Button';
import ButtonGoBack from '../../components/ButtonGoBack';
import Lottie from 'lottie-react-native';
import Animate from '../../animations/donation.json';
import CustomProgressBar from '../../components/CustomProgressBar';
import Dialog from "react-native-dialog";

const Donation: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useContext(AuthContext) as ContextProps;

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setIsEnabledHome(false);
  }
  const toggleSwitchHome = () => {
    setIsEnabledHome(previousState => !previousState);
    setIsEnabled(false);
  }

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledHome, setIsEnabledHome] = useState(false);

  const [amount, setAmount] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleDilog, setVisibleDilog] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [validade, setValidade] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('/categories');
        setData(response.data.result);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (data) {
      getCategories();
    }
  }, []);

  useEffect(() => {
    if (amount != '' && condition != '' && category != '' && isEnabled || isEnabledHome) {
      setValidade(false);
    } else {
      setValidade(true);
    }
  }, [amount, condition, category, isEnabled, isEnabledHome]);

  const handleButton = async () => {
    setVisible(true);

    let data = {
      userId: user.id,
      condition: condition,
      amount: amount,
      categoryId: category,
    }

    try {

      const response = await api.post('/donation', data);
      setVisible(false);
      setToken(response.data.result.token);
      showDialog();

    } catch (error) {
      setVisible(false);
      alert(error.response.data.message);
    }
  }

  const showDialog = () => setVisibleDilog(true);

  const hideDialog = () => {
    setVisibleDilog(false);
    navigation.dispatch(StackActions.popToTop());
  };

  const RenderDisplayDialog = () => {

    return (
      <View style={{ alignItems: "center" }}>
        <Dialog.Container visible={visibleDilog} >
          {isEnabledHome ? <Dialog.Title>Parabéns!! Você solicitou uma coleta em seu endereço</Dialog.Title> : null}
          {isEnabled ? <Dialog.Title>Parabéns!! Estamos esperando sua doação em um dos nossos pontos de coleta</Dialog.Title> : null}
          <Dialog.Description>Foi gerado um token para acompanhamento da sua solicitação:</Dialog.Description>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textToken}>{token}</Text>
          </View>
          <TouchableOpacity style={styles.ok} activeOpacity={0.5} onPress={hideDialog}>
            <Text style={styles.textSign}>OK</Text>
          </TouchableOpacity>
        </Dialog.Container>
      </View>
    );
  };

  const RenderPickerCategories = () => {

    return (
      <View style={styles.category}>
        <Text style={styles.labelPicker}>Categoria</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue as string)}
          mode='dialog'
          style={styles.picker}
        >
          <Picker.Item value={""} label="" />
          {data.map((item: any, key: any) => (
            <Picker.Item key={key} value={item.id} label={item.name} />
          ))}
        </Picker>
      </View>
    )
  }

  return (
    <>

      <CustomProgressBar visible={visible} />
      <RenderDisplayDialog />
      <ButtonGoBack onPress={() => navigation.goBack()} />

      <ScrollView style={styles.container} >

        <View style={{ alignItems: "center", marginTop: -80 }} >
          <Lottie source={Animate} autoPlay loop autoSize resizeMode="contain" style={{ width: 400, height: 300 }} />
        </View>

        <View>
          <Input
            label="Quantidade"
            placeholder="Total de peças"
            onChangeText={text => setAmount(text)}
          />

          <View style={styles.category}>
            <Text style={styles.labelPicker}>Condição</Text>
            <Picker
              selectedValue={condition}
              onValueChange={(itemValue, itemIndex) => setCondition(itemValue.toString())}
              mode='dialog'
              style={styles.picker}
            >
              <Picker.Item value={""} label="" />
              <Picker.Item value={"RE"} label="Reciclável" />
              <Picker.Item value={"US"} label="Usável" />
            </Picker>
          </View>

          <RenderPickerCategories />

          <View style={styles.access}>
            <Switch
              trackColor={{ false: "#767577", true: "#9EE5DD" }}
              thumbColor={isEnabled ? "#5ED4C6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>Deixarei em um ponto de coleta</Text>
          </View>

          <View style={styles.access}>
            <Switch
              trackColor={{ false: "#767577", true: "#9EE5DD" }}
              thumbColor={isEnabledHome ? "#5ED4C6" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchHome}
              value={isEnabledHome}
            />
            <Text>Preciso que busquem em meu endereço</Text>
          </View>

          <Buttom
            onPress={handleButton}
            text="Solicitar"
            disabled={validade}
          />

        </View>
      </ScrollView>
    </>
  )
}

export default Donation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  picker: {
    width: '100%'
  },
  category: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  labelPicker: {
    marginTop: 30,
  },
  ok: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 15
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  textToken: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  access: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
})
