import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Text, requireNativeComponent } from 'react-native';
import ButtonGoBack from '../../components/ButtonGoBack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, ContextProps } from '../../contexts/auth';
import api from '../../services/api';

const Tokens: React.FC = () => {

  const [donations, setDonations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext) as ContextProps;

  useEffect(() => {
    async function getDonations() {
      try {
        const response = await api.get(`/user/${user.id}`);
        setDonations(response.data.result.donations);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (donations) {
      getDonations();
    }
  }, []);

  const RenderList = () => {
    var list: any = [];

    !donations ? [] : donations.map((element: any) => {

      let _donations;
      _donations = {
        id: element.id,
        status: element.status,
        token: element.token,
        amount: element.amount,
        condition: element.condition,
        categoryId: element.categoryId,
      };

      list.push(_donations);
    })

    return (
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RenderItem
            data={item}
          />
        )}
      >
      </FlatList>
    )
  };

  interface Props {
    data: any,
  }

  const RenderItem: React.FC<Props> = (props) => {
    return (
      <View style={styles.itemContainer}>

        <View style={styles.itemCard}>
          <Text style={styles.text}>{user.name}</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.text}>Token: </Text>
          <Text style={[styles.text,{fontWeight: 'bold', color: "#e63946"}]}>{props.data.token}</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.text}>Status: </Text>
          <Text style={[styles.text,{fontWeight: 'bold', color:"#e63946"}]}>{props.data.status == 'AT' ? "ATIVO" : "PENDENTE"}</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.text}>Condição: </Text>
          <Text style={styles.text}>{props.data.condition == 'RE' ? 'Reciclável' : 'Usável'}</Text>
        </View>

        <View style={styles.itemCard}>
          <Text style={styles.text}>Quantidade: </Text>
          <Text style={styles.text}>{props.data.amount}</Text>
        </View>

      </View>
    )
  }

  return (
    <>
      <ButtonGoBack onPress={() => navigation.goBack()} />
      <SafeAreaView style={styles.container}>
        <View style={styles.customList}>
          <RenderList />
        </View>
      </SafeAreaView>
    </>
  );
}

export default Tokens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  list: {
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  itemContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    marginBottom: 10,
  },
  customList: {
    justifyContent: 'center',
    paddingBottom: 20
  }
})