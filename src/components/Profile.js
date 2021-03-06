import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {Button, Text, ActivityIndicator} from 'react-native-paper';

import Title from '../components/Title';
import useAuth from '../hooks/useAuth';
import useConcerts from '../hooks/useConcerts';
import {theme} from '../core/theme';

const Profile = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {auth, loading, loadUserData, singOutAuth} = useAuth();

  useEffect(() => {
    setEmail(auth.email);
    setBalance(auth.balance);
    setName(auth.name);
    setSurname(auth.surname);
    setPhone(auth.phone);
    setRole(auth.role);
  }, [auth]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadUserData();
    setRefreshing(false);
  }, []);
  const handleClose = () => {
    singOutAuth();
    navigation.replace('Dashboard');
  };
  const handleEdit = async () => {
    navigation.navigate('EditProfile');
  };
  const handleAddBalance = async () => {
    navigation.navigate('AddBalance');
  };
  const handleSingIn = () => {
    navigation.navigate('SingIn');
  };
  const handleSingUp = () => {
    navigation.navigate('SingUp');
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      {auth.name !== 'null' ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Title>Saldo</Title>
            <Title style={styles.euros}>{balance} €</Title>
            <Button
              style={styles.button}
              icon="cash-multiple"
              mode="contained"
              onPress={handleAddBalance}>
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
            <Button
              style={styles.button}
              icon="pencil"
              mode="contained"
              onPress={handleEdit}>
              Editar perfil
            </Button>
            {loading ? <ActivityIndicator animating={true} /> : null}
            <Button
              style={styles.button}
              icon="logout"
              mode="contained"
              onPress={handleClose}>
              Cerrar Sesión
            </Button>
            <View style={{marginBottom: 60}} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.containerNoLog}>
          <Text style={styles.textGrayNoLog}>
            Debes iniciar sesión o registrarte para ver tu perfil...
          </Text>
          <Button
            style={styles.buttonNoLog}
            mode="contained"
            onPress={handleSingIn}>
            Iniciar Sesión
          </Button>
          <Button
            style={styles.buttonNoLog}
            mode="contained"
            onPress={handleSingUp}>
            Registrarse
          </Button>
        </View>
      )}
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
  containerNoLog: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  textGrayNoLog: {
    fontSize: 17,
    textAlign: 'justify',
    width: '100%',
    marginVertical: 6,
    fontWeight: 'bold',
    color: theme.colors.gray,
  },
  buttonNoLog: {
    borderRadius: 25,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
});

export default Profile;
