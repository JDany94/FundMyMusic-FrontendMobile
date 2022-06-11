import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from './src/core/theme';
import {SingIn, SingUp, ForgotPass, Dashboard} from './src/screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SingIn"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SingIn" component={SingIn} />
          <Stack.Screen name="SingUp" component={SingUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
