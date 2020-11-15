import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
export const AuthContext = createContext({});

import { Decrypt } from '../utils/crypto';

export interface Props {
  children: any
}

export interface User {
  email: string;
  password: string;
  registryCode: string;
  gender: string;
}

export interface ContextProps {
  signed: boolean;
  user: any;
  loading: boolean; 
  signUp: any;
  signIn: any;
  signOut: any;
  loadingLogin: any
}

const Auth: React.FC<Props> = (props) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    async function load() {
      const storageUser = await AsyncStorage.getItem('user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    load();
  }, [])

  const signUp = async (json: User) => {
    try {
      const response = await api.post('/user', json);
      setUser(response.data.result);
      insertUser(response.data.result);
    } catch (error) {
      alert(error.message);
    }
  }

  const signIn = async (email: string, password: string) => {

    setLoadingLogin(true);

    let data = {
      email: email,
      password: password,
    }

    try {
      const response = await api.post('/user/signin', data);
      setUser(Decrypt(response.data.result));
      insertUser(Decrypt(response.data.result));
      setLoadingLogin(false);
    } catch (error) {
      setLoadingLogin(false);
      alert(error.message);
    }
  }

  const signOut = async () => {
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
  }

  const insertUser = async (data: object) => {
    await AsyncStorage.setItem('user', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, loadingLogin, signUp, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default Auth;