import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button, Dialog, Portal, ActivityIndicator} from 'react-native-paper';
import SweetAlert from 'react-native-sweet-alert';

import BackgroundGray from '../components/BackgroundGray';
import Title from '../components/Title';
import BackButton from '../components/BackButton';
import {validations} from '../helpers/validations';
import {theme} from '../core/theme';

import useAuth from '../hooks/useAuth';

const EditProfile = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState(0);

  const {
    RegExpText,
    RegExpNumbers,
    alert,
    setAlert,
    msgAlert,
    setMsgAlert,
    validate,
  } = validations();
  const {auth, editProfile, loading} = useAuth();

  useEffect(() => {
    setEmail(auth.email);
    setName(auth.name);
    setSurname(auth.surname);
    setPhone(auth.phone);
  }, []);

  const handleSubmit = async () => {
    const user = {
      _id: auth._id,
      name,
      surname,
      phone,
      from: 'EditProfile',
    };

    if (!validate(user)) {
      return;
    }

    const {response, error} = await editProfile(user);

    if (response) {
      setEmail('');
      setName('');
      setSurname('');
      setPhone(0);
      SweetAlert.showAlertWithOptions(
        {
          title: 'Perfil actualizado con éxito',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: true,
        },
        callback => null,
      );
      navigation.goBack();
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
          <View style={{marginTop: 10}}>
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
              value={phone.toString()}
              onChangeText={text => setPhone(text.replace(RegExpNumbers, ''))}
              keyboardType="phone-pad"
            />
          </View>
          {loading && <ActivityIndicator animating={true} />}
          <Button
            style={styles.button}
            icon="content-save"
            mode="contained"
            onPress={handleSubmit}>
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
