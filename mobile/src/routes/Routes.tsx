import React, { useContext } from 'react';
import { AuthContext, ContextProps } from '../contexts/auth';
import { View, ActivityIndicator } from 'react-native';

import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';

const Routes = () => {
  const { signed, loading } = useContext(AuthContext) as ContextProps;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  );
};

export default Routes;
