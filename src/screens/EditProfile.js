import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button, Dialog, Portal, ActivityIndicator} from 'react-native-paper';

import BackgroundGray from '../components/BackgroundGray';
import Title from '../components/Title';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';

import useAuth from '../hooks/useAuth';

const EditProfile = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState(0);
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');

  const {auth, editProfile, loading, setLoading} = useAuth();

  useEffect(() => {
    setEmail(auth.email);
    setName(auth.name);
    setSurname(auth.surname);
    setPhone(auth.phone);
  }, []);

  const handleSubmit = async () => {
    if ([name, surname].includes('')) {
      setMsgAlert('Todos los campos son obligatorios');
      setAlert(true);
      return;
    }

    // TODO:Validaciones y Notificacion bonita

    const JSON = {
      _id: auth._id,
      name,
      surname,
      phone,
    };
    setLoading(true);
    if (await editProfile(JSON)) {
      setLoading(false);
      setEmail('');
      setName('');
      setSurname('');
      setPhone(0);
      navigation.goBack();
    } else {
      setMsgAlert('Error de conexión');
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <BackgroundGray>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <View style={{marginTop:10}}>

          <Title>Editar perfil</Title>
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={[styles.input, {color: theme.colors.gray}]}
              editable={false}
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
              placeholder="Apellidos"
              placeholderTextColor="white"
              value={surname}
              onChangeText={text => setSurname(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="white"
              value={phone.toString()}
              onChangeText={text => setPhone(text)}
              keyboardType="phone-pad"
            />
          </View>
          {loading && <ActivityIndicator animating={true} />}
          <Button style={styles.button} icon="content-save" mode="contained" onPress={handleSubmit}>
            Guardar
          </Button>
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
    marginTop: 5,
    justifyContent: 'center',
  },
  inputs: {
    width: '100%',
    marginTop: 45,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    color: theme.colors.text,
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

export default EditProfile;
