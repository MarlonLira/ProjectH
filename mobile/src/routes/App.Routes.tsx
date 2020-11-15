import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather as Icon } from '@expo/vector-icons';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Progress from '../pages/Progress';
import Donation from '../pages/Donation';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

enum Icons {
  Home = 'map-pin',
  Profile = 'user',
  Progress = 'trending-up',
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let name = (Icons as any)[route.name];
          return <Icon name={name} color={color} size={size} />
        }
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#fff',
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
          justifyContent: 'center',
        },
        activeTintColor: '#000',
      }}
    >
      <Tab.Screen options={{ title: 'Pontos' }} name="Home" component={Home} />
      <Tab.Screen options={{ title: 'Progresso' }} name="Progress" component={Progress} />
      <Tab.Screen options={{ title: 'Perfil' }} name="Profile" component={Profile} />

    </Tab.Navigator>
  );
}

const AppRoutes = () => {
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
          name="Tabs"
          component={MyTabs}
        />

        <AppStack.Screen
          name="Donation"
          component={Donation}
        />
        
      </AppStack.Navigator>
    </NavigationContainer>
  )
};

export default AppRoutes;