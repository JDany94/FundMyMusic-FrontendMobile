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
  EditProfile,
  AddBalance,
  Concert,
  ConcertTicket,
} from './src/screens';
import {AuthProvider} from './src/context/AuthProvider';
import {ConcertsProvider} from './src/context/ConcertsProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ConcertsProvider>
          <Provider theme={theme}>
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
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="AddBalance" component={AddBalance} />
              <Stack.Screen name="Concert" component={Concert} />
              <Stack.Screen name="ConcertTicket" component={ConcertTicket} />
            </Stack.Navigator>
          </Provider>
        </ConcertsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
