import React, {useState} from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';

import {Button, Dialog, Portal, ActivityIndicator} from 'react-native-paper';
import CreditCard from 'react-native-credit-card';
import SweetAlert from 'react-native-sweet-alert';

import BackgroundGray from '../components/BackgroundGray';
import Title from '../components/Title';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {validations} from '../helpers/validations';

import useAuth from '../hooks/useAuth';

const AddBalance = ({navigation}) => {
  const [newBalance, setNewBalance] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardCVCFocus, setCardCVCFocus] = useState(false);

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

  const handleSubmit = async () => {
    const user = {
      _id: auth._id,
      balance: newBalance,
      from: 'AddBalance',
    };

    if (!validate(user)) {
      return;
    }

    user.balance = parseInt(auth.balance) + parseInt(newBalance);
    const {response, error} = await editProfile(user);

    if (response) {
      setNewBalance('');
      setCardName('');
      setCardNumber('');
      setCardDate('');
      setCardCVC('');

      SweetAlert.showAlertWithOptions(
        {
          title: 'Saldo agregado con éxito',
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
  //TODO: validar mes y año
  return (
    <BackgroundGray>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <View style={styles.title}>
            <Title>Agregar saldo</Title>
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={styles.inputBalance}
              placeholder="Saldo (€)"
              placeholderTextColor="white"
              value={newBalance}
              onChangeText={text =>
                setNewBalance(text.replace(RegExpNumbers, ''))
              }
              keyboardType="numeric"
            />
          </View>
          <CreditCard
            style={{alignSelf: 'center'}}
            type={'visa'}
            imageFront={require('../assets/card-front.png')}
            imageBack={require('../assets/card-back.png')}
            shiny={false}
            bar={false}
            focused={cardCVCFocus ? 'cvc' : 'name'}
            number={cardNumber}
            name={cardName}
            expiry={cardDate}
            cvc={cardCVC}
          />
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Numero de la tarjera"
              placeholderTextColor="white"
              value={cardNumber}
              onChangeText={text =>
                setCardNumber(text.replace(RegExpNumbers, ''))
              }
              maxLength={16}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre del propietario"
              placeholderTextColor="white"
              value={cardName}
              onChangeText={text => setCardName(text.replace(RegExpText, ''))}
              maxLength={35}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de caducidad (MMAA)"
              placeholderTextColor="white"
              value={cardDate}
              onChangeText={text =>
                setCardDate(text.replace(RegExpNumbers, ''))
              }
              maxLength={4}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="CVC"
              placeholderTextColor="white"
              value={cardCVC}
              onBlur={() => setCardCVCFocus(false)}
              onFocus={() => setCardCVCFocus(true)}
              onChangeText={text => setCardCVC(text.replace(RegExpNumbers, ''))}
              maxLength={3}
              keyboardType="numeric"
            />
          </View>
          {loading && <ActivityIndicator animating={true} />}
          <Button
            style={styles.button}
            icon="cash-multiple"
            mode="contained"
            onPress={handleSubmit}>
            Recargar
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
    marginTop: 5,
  },
  title: {
    marginTop: 10,
    alignItems: 'center',
  },
  inputs: {
    width: '100%',
    marginTop: 25,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    color: theme.colors.text,
    padding: 12,
  },
  inputBalance: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '30%',
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
});

export default AddBalance;
