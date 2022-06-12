import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import {theme} from '../core/theme';

const Profile = ({navigation}) => {
  const {auth, singOutAuth} = useAuth();

  const handleClose = async () => {
    await AsyncStorage.clear();
    singOutAuth();
    navigation.replace('SingIn');
  };

  //TODO: Agragar salgo a la base de datos (Hacer agregar salgo y modificar perfil)
  //Arregar que no carga a la primera el tlf y el rol

  return (
    <View style={{flex:1,backgroundColor: theme.colors.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header>Saldo</Header>
          <Header style={styles.euros}>20.50 €</Header>
          <Button style={styles.button} mode="contained" onPress={''}>
            Agregar saldo
          </Button>
          <View style={styles.containerProfile}>
            <Header style={styles.titleView}>Email</Header>
            <Text style={styles.textView}>{auth.email}</Text>
            <Header style={styles.titleView}>Nombre y apellidos</Header>
            <Text style={styles.textView}>
              {auth.name} {auth.surname}
            </Text>
            <Header style={styles.titleView}>Phone</Header>
            <Text style={styles.textView}>{auth.phone}</Text>
            <Header style={styles.titleView}>Tipo de perfil</Header>
            <Text style={styles.textView}>
              {auth.role === 'User' ? 'Usuario' : null}
            </Text>
          </View>
          <Button style={styles.button} mode="contained" onPress={''}>
            Editar perfil
          </Button>
          <Button style={styles.button} mode="contained" onPress={handleClose}>
            Cerrar Sesión
          </Button>

          <View style={{marginBottom: 60}} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  button: {
    borderRadius: 25,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  euros: {
    fontSize: 35,
    fontWeight: '100',
  },
  containerProfile: {
    backgroundColor: theme.colors.bgBottomBar,
    width: '100%',
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
  },
  titleView: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 8,
  },
  textView: {
    color: theme.colors.gray,
  },
});

export default Profile;
