import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import {theme} from '../core/theme';

export default function SingUp({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = () => {
    if ([email, name, surname, phone, password, rePassword].includes('')) {
      //alerta
      return;
    }
    setEmail('');
    setName('');
    setSurname('');
    setPhone('');
    setPassword('');
    setRePassword('');
    navigation.replace('Dashboard');
  };

  return (
    <Background>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Logo />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
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
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}>
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
  button: {
    borderRadius: 25,
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
