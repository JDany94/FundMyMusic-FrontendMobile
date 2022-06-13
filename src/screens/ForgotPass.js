import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';

import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Title from '../components/Title';

const ForgotPass = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email === '') {
      //validar
      return;
    }
    navigation.navigate('SingIn');
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
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Enviar Correo
        </Button>
      </View>
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
