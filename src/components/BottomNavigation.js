import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './Profile';
import Concerts from './Concerts';
import SavedConcerts from './SavedConcerts';
import Tickets from './Tickets';

import {theme} from '../core/theme';

const BottomNav = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.bgBottomBar,
          borderRadius: 18,
          marginBottom: 25,
          marginHorizontal: 20,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarShowLabel: false,
      }}
      initialRouteName="Concerts">
      <Tab.Screen
        name="Concerts"
        component={Concerts}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="microphone-variant"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conciertos guardados"
        component={SavedConcerts}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Boletos comprados"
        component={Tickets}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mi cuenta"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
