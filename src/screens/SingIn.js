import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import {theme} from '../core/theme';

export default function SingIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if ((email || password) === '') {
      //alerta
      return;
    }
    setEmail('')
    setPassword('')
    navigation.replace('Dashboard');
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
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="white"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
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
    marginVertical: 12,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    color: '#fff',
    padding: 12,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  button: {
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
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
