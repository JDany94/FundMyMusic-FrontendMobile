import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import {
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from '../components/Background';
import Logo from '../components/Logo';
import {useTogglePasswordVisibility} from '../helpers/useTogglePasswordVisibility';
import {validations} from '../helpers/validations';
import {theme} from '../core/theme';

import useAuth from '../hooks/useAuth';

const SingIn = ({navigation}) => {
  let forgot = false; // TODO Hacer Olvidar contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const {alert, setAlert, msgAlert, setMsgAlert, approved, validate} =
    validations();
  const {singIn, loading} = useAuth();

  const handleSubmit = async () => {
    const user = {
      email,
      password,
      from: 'SingIn',
    };

    validate(user);

    if (!approved) {
      return;
    }

    const {response, error} = await singIn(user);

    if (response) {
      setEmail('');
      setPassword('');
      setMsgAlert('');
      navigation.replace('Dashboard');
    } else {
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
          <View style={styles.inputContainerPass}>
            <TextInput
              style={styles.inputPass}
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically
              placeholder="Contraseña"
              placeholderTextColor="white"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={passwordVisibility}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={24}
                color={theme.colors.text}
              />
            </Pressable>
          </View>
        </View>
        {loading && <ActivityIndicator animating={true} />}
        {forgot && (
          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
              <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        )}
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
  inputContainerPass: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputPass: {
    color: theme.colors.text,
    padding: 12,
    width: '90%',
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
