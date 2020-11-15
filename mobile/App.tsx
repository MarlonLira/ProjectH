import { StatusBar } from 'react-native';
import React from 'react';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Routes />
      </AuthProvider>
    </>
  );
};

