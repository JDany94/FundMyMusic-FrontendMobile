import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Button, Dialog, Portal, ActivityIndicator} from 'react-native-paper';

import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Title from '../components/Title';

import {validations} from '../helpers/validations';
import useAuth from '../hooks/useAuth';
import {theme} from '../core/theme';

const ForgotPass = ({navigation}) => {
  const [email, setEmail] = useState('');

  const {alert, setAlert, msgAlert, setMsgAlert, validate} = validations();
  const {forgotPassword, loading} = useAuth();

  const handleSubmit = async () => {
    const user = {
      email,
      from: 'ForgotPass',
    };

    if (!validate(user)) {
      return;
    }

    const {response, error, msg} = await forgotPassword(user);
    if (response) {
      setEmail('');
      setMsgAlert(msg);
      setAlert(true);
    } else {
      setMsgAlert(
        error.response.status !== 0
          ? error.response.data.msg
          : 'Error de conexión',
      );
      setAlert(true);
    }
  };

  const handleAlert = () => {
    setAlert(false);
    if (msgAlert === 'Hemos enviado un email con las instrucciones') {
      navigation.navigate('SingIn');
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Logo />
        <Title>Recuperar contraseña</Title>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        {loading && <ActivityIndicator animating={true} />}
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Enviar Correo
        </Button>
      </View>
      <Portal>
        <Dialog
          style={{backgroundColor: theme.colors.background}}
          visible={alert}
          onDismiss={() => setAlert(false)}>
          <Dialog.Title>{msgAlert}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => handleAlert()}>OK</Button>
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
    marginVertical: 12,
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
});

export default ForgotPass;
