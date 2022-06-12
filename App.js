import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from './src/core/theme';
import {
  SingIn,
  SingUp,
  ForgotPass,
  Dashboard,
  SplashScreen,
} from './src/screens';
import {AuthProvider} from './src/context/AuthProvider';
import {ConcertsProvider} from './src/context/ConcertsProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ConcertsProvider>
        <Provider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="SingIn" component={SingIn} />
              <Stack.Screen name="SingUp" component={SingUp} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="ForgotPass" component={ForgotPass} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ConcertsProvider>
    </AuthProvider>
  );
}

// TODO: Que no se pueda poner horizontal
