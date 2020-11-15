import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ButtonGoBack from '../../components/ButtonGoBack';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import api from '../../services/api'
import { AuthContext } from '../../contexts/auth';

import Input from '../../components/Input';
import Buttom from '../../components/Button';

const Donation: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [amount, setAmount] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('/categories');
        setData(response.data.result);

      } catch (error) {
        console.log(error.message);
      }
    }
    getCategories();
  })

  var allCategories = data.map((item: any, key: any) => (
    <Picker.Item key={key} value={item.id} label={item.name} />
  ))

  const handleButton = () => {
    
    let data = {
      userId: user.id,
      condition: condition,
      amount: amount,
      categoryId: category
    }

    try {
      const response = api.post('/donation', data);
      
    } catch (error) {
      alert(error.message)
    }

  }


  return (
    <>
      <ButtonGoBack onPress={() => navigation.goBack()} />
      <View style={styles.container} >

        <Input
          placeholder="Quantidade"
          onChangeText={text => setAmount(text)}
        />

        <View style={styles.category}>
          <Text style={styles.labelPicker}>Condição</Text>
          <Picker
            selectedValue={condition}
            onValueChange={(itemValue, itemIndex) => setCondition(itemValue)}
            mode='dialog'
            style={styles.picker}
          >
            <Picker.Item value={""} label="" />
            <Picker.Item value={"Reciclavel"} label="Reciclável" />
            <Picker.Item value={"Usavel"} label="Usável" />
          </Picker>
        </View>

        <View style={styles.category}>
          <Text style={styles.labelPicker}>Categoria</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            mode='dialog'
            style={styles.picker}
          >
            <Picker.Item value={""} label="" />
            {allCategories}
          </Picker>
        </View>

        <Input
          placeholder="Endereço para coleta"
        />

        <Buttom
          onPress={() => { }}
          text="Solicitar"
        />
      </View>
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
  }
})
