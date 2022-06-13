import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';
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
import {theme} from '../core/theme';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const SingIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');

  const {setAuth, loading, setLoading} = useAuth();

  const handleSubmit = async () => {
    if ((email || password) === '') {
      setMsgAlert('Todos los campos son obligatorios');
      setAlert(true);
      return;
    }

    // TODO:Validaciones
    // TODO:Meter todos los axios en sus providers con su respectivo loading

    try {
      setLoading(true);
      const {data} = await axiosClient.post(`/user/auth`, {
        email,
        password,
        from: 'User',
      });
      await AsyncStorage.setItem('Token', data.token);
      setAuth(data);

      setEmail('');
      setPassword('');
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
  //TODO hacer scroll
  return (
    <Background>
      <View style={styles.container}>
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
            placeholder="Contraseña"
            placeholderTextColor="white"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        {loading && <ActivityIndicator animating={true} />}
        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
            <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <Button style={styles.button} mode="contained" onPress={handleSubmit}>
          Iniciar sesión
        </Button>
        <View style={styles.row}>
          <Text style={styles.text}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SingUp')}>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: theme.colors.text,
    marginBottom: 15,
    borderRadius: 25,
    padding: 12,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 10,
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
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    color: theme.colors.primary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SingIn;
