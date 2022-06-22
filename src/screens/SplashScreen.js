import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';

import Background from '../components/Background';
import Logo from '../components/Logo';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const SplashScreen = ({navigation}) => {
  const {setAuth} = useAuth();
  const [loading, setLoading] = useState(true);

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
              setLoading(false);
              navigation.replace('Dashboard');
            }, 1000);
          } catch (e) {
            await AsyncStorage.clear();
            setTimeout(() => {
              setLoading(false);
              navigation.replace('Dashboard');
            }, 1000);
          }
        } else {
          setTimeout(() => {
            setLoading(false);
            navigation.replace('Dashboard');
          }, 1000);
        }
      } catch (e) {
        setTimeout(() => {
          setLoading(false);
          navigation.replace('Dashboard');
        }, 1000);
      }
    };
    checkAuth();
  }, []);

  return (
    <Background>
      <View style={{flex: 1}} />
      <View style={styles.container}>
        <Logo />
        <ActivityIndicator animating={loading} />
      </View>
      <View style={{flex: 1}} />
      <View style={{flex: 1}} />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
});

export default SplashScreen;
