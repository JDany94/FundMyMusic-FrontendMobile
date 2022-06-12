import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';

import BackgroundDashboard from '../components/BackgroundDashboard';
import Logo from '../components/Logo';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

export default function SplashScreen({navigation}) {
  const {setAuth} = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        if (token !== null) {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const {data} = await axiosClient.get('/user/profile', config);
            setAuth(data);
            setTimeout(() => {
              navigation.replace('Dashboard');
            }, 1000);
          } catch (error) {
            setAuth({});
            setTimeout(() => {
              navigation.replace('SingIn');
            }, 1000);
          }
        } else {
          setTimeout(() => {
            navigation.replace('SingIn');
          }, 1000);
        }
      } catch (e) {
        setTimeout(() => {
          navigation.replace('SingIn');
        }, 1000);
      }
    };
    checkAuth();
  }, []);

  return (
    <BackgroundDashboard>
      <View style={styles.container}>
        <Logo />
        <ActivityIndicator animating={true} />
      </View>
    </BackgroundDashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
