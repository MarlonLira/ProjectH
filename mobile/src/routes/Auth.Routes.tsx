import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

const AppStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#fff',
          }
        }}
      >
        <AppStack.Screen
          name="Login"
          component={Login}
        />

        <AppStack.Screen
          name="Register"
          component={Register}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
};

export default AuthRoutes;