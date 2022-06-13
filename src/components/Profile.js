import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Title from '../components/Title';
import useAuth from '../hooks/useAuth';
import {theme} from '../core/theme';

const Profile = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const {auth, singOutAuth} = useAuth();

  useEffect(() => {
    setEmail(auth.email);
    setBalance(auth.balance)
    setName(auth.name);
    setSurname(auth.surname);
    setPhone(auth.phone);
    setRole(auth.role);
  }, [auth]);

  const handleClose = async () => {
    await AsyncStorage.clear();
    singOutAuth();
    navigation.replace('SingIn');
  };
  const handleEdit = async () => {
    navigation.navigate('EditProfile');
  };
  const handleAddBalance = async () => {
    navigation.navigate('AddBalance');
  };

  //TODO: Hacer agregar saldo

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Title>Saldo</Title>
          <Title style={styles.euros}>{balance} €</Title>
          <Button style={styles.button} mode="contained" onPress={handleAddBalance}>
            Agregar saldo
          </Button>
          <View style={styles.containerProfile}>
            <Title style={styles.titleView}>Email</Title>
            <Text style={styles.textView}>{email}</Text>
            <Title style={styles.titleView}>Nombre y apellidos</Title>
            <Text style={styles.textView}>
              {name} {surname}
            </Text>
            <Title style={styles.titleView}>Phone</Title>
            <Text style={styles.textView}>{phone}</Text>
            <Title style={styles.titleView}>Tipo de perfil</Title>
            <Text style={styles.textView}>
              {role === 'User' ? 'Usuario' : null}
            </Text>
          </View>
          <Button style={styles.button} mode="contained" onPress={handleEdit}>
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
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    alignSelf: 'center',
    justifyContent: 'center',
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
