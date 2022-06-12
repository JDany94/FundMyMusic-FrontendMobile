import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Background from '../components/Background';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

export default function SingUp({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const {setAuth} = useAuth();

  const handleSubmit = async () => {
    if ([email, name, surname, phone, password, rePassword].includes('')) {
      setMsgAlert('Todos los campos son obligatorios');
      setAlert(true);
      return;
    }

    // TODO:Validaciones

    try {
      setLoading(true);
      const JSON = {
        email,
        name,
        surname,
        phone,
        password,
        role: 'User',
        //sin validar correo
        confirmed: 'true',
        token: 'Confirmed',
      };
      const {data} = await axiosClient.post(`/user`, JSON);
      await AsyncStorage.setItem('Token', data.token);
      setAuth(data);

      setEmail('');
      setName('');
      setSurname('');
      setPhone('');
      setPassword('');
      setRePassword('');
      setMsgAlert('');
      setLoading(false);
      navigation.replace('Dashboard');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMsgAlert(
        error.response.status !== 0
          ? error.response.data.msg
          : 'Error de conexión',
      );
      setAlert(true);
    }
  };

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <Logo />
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="white"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor="white"
              value={surname}
              onChangeText={text => setSurname(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="white"
              value={phone}
              onChangeText={text => setPhone(text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="white"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="white"
              value={rePassword}
              onChangeText={text => setRePassword(text)}
              secureTextEntry={true}
            />
          </View>
          {loading && <ActivityIndicator animating={true} />}
          <Button style={styles.button} mode="contained" onPress={handleSubmit}>
            Registrarse
          </Button>
          <View style={styles.row}>
            <Text style={styles.text}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.replace('SingIn')}>
              <Text style={styles.link}>Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          style={{backgroundColor: theme.colors.background}}
          visible={alert}
          onDismiss={() => setAlert(false)}>
          <Dialog.Title>{msgAlert}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Background>
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
  inputs: {
    width: '100%',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    color: '#fff',
    padding: 12,
  },
  button: {
    borderRadius: 25,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
