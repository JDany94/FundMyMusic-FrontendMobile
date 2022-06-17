import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ActivityIndicator,
  Text,
  Button,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import SweetAlert from 'react-native-sweet-alert';

import Title from '../components/Title';
import BackButton from '../components/BackButton';
import FavButton from '../components/FavButton';
import BackgroundGray from '../components/BackgroundGray';
import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';

const Concert = ({navigation}) => {
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');

  const [numberTickets, setNumberTickets] = useState(1);

  const {concert, loading, loadBuy, buyTickets, getConcerts} = useConcerts();

  const {
    FlyerURL,
    title,
    place,
    genre,
    date,
    description,
    capacity,
    minimumSales,
    gift,
    sold,
    price,
    status,
    soldOut,
  } = concert;

  const handleBuy = async () => {
    if (await buyTickets(concert, numberTickets)) {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Compra realizada con éxito',
          subTitle: 'En el apartado de boletos tienes tus entradas',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: true,
        },
        callback => null,
      );
      getConcerts();
      navigation.replace('Dashboard');
    } else {
      setMsgAlert('Saldo insuficiente');
      setAlert(true);
    }
  };

  const handleSum = () => {
    numberTickets < capacity - sold
      ? setNumberTickets(numberTickets + 1)
      : null;
  };
  const handleRest = () => {
    numberTickets > 1 ? setNumberTickets(numberTickets - 1) : null;
  };

  return (
    <BackgroundGray>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center'}}
          animating={true}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <BackButton navigation={navigation} />
            <FavButton navigation={navigation} />
            <Image
              style={styles.img}
              source={{
                uri: FlyerURL,
              }}
            />
            <Title style={styles.title}>{title}</Title>
            <View style={styles.separator} />
            <Text style={styles.text}>{place}</Text>
            <Text style={styles.text}>
              {date
                .split('T')[0]
                .split('-')
                .reverse()
                .join()
                .replace(/,/g, '/')}
            </Text>
            {status === 'Open' ? (
              <Button style={styles.tagOpen} icon="calendar" mode="contained">
                Fecha Abierta
              </Button>
            ) : (
              <Button style={styles.tagClosed} icon="calendar" mode="contained">
                Fecha Cerrada
              </Button>
            )}
            {soldOut && (
              <Button
                style={styles.tagClosed}
                icon="ticket-confirmation-outline"
                mode="contained">
                Agotado
              </Button>
            )}
            <View style={styles.separator} />
            <Text style={styles.textGenre}>
              <Text style={{color: theme.colors.gray, fontWeight: 'bold'}}>
                Género:{' '}
              </Text>
              {genre}
            </Text>
            <Text style={styles.textDesc}>{description}</Text>
            <Text style={styles.textGray}>
              Capacidad: <Text style={styles.textNumbers}>{capacity}</Text>
            </Text>
            <Text style={styles.textGray}>
              Ventas mínimas para celebración:
              <Text style={styles.textNumbers}> {minimumSales}</Text>
            </Text>
            {gift ? (
              <Text style={styles.textGray}>
                Regalos para los primeros {minimumSales}:
                <Text style={styles.textNumbers}> {gift}</Text>
              </Text>
            ) : null}
            <Text style={styles.textGray}>
              Entradas disponibles:{' '}
              <Text style={styles.textNumbers}>{capacity - sold}</Text>
            </Text>

            {!soldOut && (
              <>
                <View style={styles.counter}>
                  <TouchableOpacity
                    onPress={handleRest}
                    style={styles.buttonCounter}>
                    <Text style={styles.textCounter}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.textCounter}>{numberTickets}</Text>
                  <TouchableOpacity
                    onPress={handleSum}
                    style={styles.buttonCounter}>
                    <Text style={styles.textCounter}>+</Text>
                  </TouchableOpacity>
                </View>
                {loadBuy && <ActivityIndicator animating={true} />}
                <Button
                  style={styles.button}
                  icon="ticket-confirmation-outline"
                  mode="contained"
                  onPress={handleBuy}>
                  Comprar entrada ({price * numberTickets}€)
                </Button>
              </>
            )}
          </View>
        </ScrollView>
      )}
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
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  img: {
    borderRadius: 20,
    width: 240,
    height: 340,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.colors.secondary,
    margin: 8,
  },
  tagOpen: {
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: theme.colors.green,
  },
  tagClosed: {
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: theme.colors.primary,
  },
  textDesc: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
  textGenre: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  textNumbers: {
    fontSize: 18,
    textAlign: 'justify',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  textGray: {
    fontSize: 18,
    textAlign: 'justify',
    marginVertical: 6,
    fontWeight: 'bold',
    color: theme.colors.gray,
  },
  button: {
    borderRadius: 25,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  buttonCounter: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
  },
  textCounter: {
    marginHorizontal: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  separator: {
    margin: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#635666',
  },
});

export default Concert;
