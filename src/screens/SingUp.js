import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

import BackgroundGray from '../components/BackgroundGray';
import Logo from '../components/Logo';
import {useTogglePasswordVisibility} from '../helpers/useTogglePasswordVisibility';
import {validations} from '../helpers/validations';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';

import useAuth from '../hooks/useAuth';

const SingUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const {
    RegExpNumbers,
    RegExpText,
    alert,
    setAlert,
    msgAlert,
    setMsgAlert,
    validate,
  } = validations();
  const {
    passwordVisibility,
    rePasswordVisibility,
    rightIcon,
    rightIconRe,
    handlePasswordVisibility,
    handleRePasswordVisibility,
  } = useTogglePasswordVisibility();
  const {singUp, loading} = useAuth();

  const handleSubmit = async () => {
    const user = {
      email,
      name,
      surname,
      phone,
      password,
      rePassword,
      role: 'User',
      from: 'SingUp',
    };

    if (!validate(user)) {
      return;
    }

    const {response, error} = await singUp(user);

    if (response) {
      setEmail('');
      setName('');
      setSurname('');
      setPhone('');
      setPassword('');
      setRePassword('');
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
    <BackgroundGray>
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
              onChangeText={text => setName(text.replace(RegExpText, ''))}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              placeholderTextColor="white"
              value={surname}
              onChangeText={text => setSurname(text.replace(RegExpText, ''))}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="white"
              value={phone}
              onChangeText={text => setPhone(text.replace(RegExpNumbers, ''))}
              keyboardType="numeric"
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
            <View style={styles.inputContainerPass}>
              <TextInput
                style={styles.inputPass}
                name="repassword"
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically
                placeholder="Confirmar contraseña"
                placeholderTextColor="white"
                value={rePassword}
                onChangeText={text => setRePassword(text)}
                secureTextEntry={rePasswordVisibility}
              />
              <Pressable onPress={handleRePasswordVisibility}>
                <MaterialCommunityIcons
                  name={rightIconRe}
                  size={24}
                  color={theme.colors.text}
                />
              </Pressable>
            </View>
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
    </BackgroundGray>
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
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    color: theme.colors.text,
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
    color: theme.colors.text,
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

export default SingUp;
