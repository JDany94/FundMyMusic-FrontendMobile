import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

import Title from '../components/Title';
import BackButton from '../components/BackButton';
import BackgroundGray from '../components/BackgroundGray';
import QRAccordion from '../components/QRAccordion';
import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';
import useAuth from '../hooks/useAuth';

const Concert = ({navigation}) => {
  const {concert, loading} = useConcerts();
  const {auth} = useAuth();

  const {_id, FlyerURL, title, place, genre, date} = concert;

  let tickets = [];

  const getQuantity = id => {
    for (let i = 0; i < auth.purchasedTickets.length; i++) {
      if (
        JSON.stringify(auth.purchasedTickets[i].concert) === JSON.stringify(id)
      ) {
        return auth.purchasedTickets[i].quantity;
      }
    }
  };

  for (let i = 0; i < getQuantity(_id); i++) {
    tickets.push(
      <View style={{width: '100%'}}>
        <QRAccordion value={`${FlyerURL}/${i}`} name={`Entrada ${i+1}`} />
      </View>,
    );
  }

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

            <Text style={styles.textGenre}>
              <Text style={{color: theme.colors.gray, fontWeight: 'bold'}}>
                Género:{' '}
              </Text>
              {genre}
            </Text>
            <Text style={styles.textGenre}>
              <Text style={{color: theme.colors.gray, fontWeight: 'bold'}}>
                Entradas:{' '}
              </Text>
              {getQuantity(_id)}
            </Text>
            <View style={styles.separator} />
            {tickets}
          </View>
        </ScrollView>
      )}
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
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
  textGenre: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  separator: {
    margin: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#635666',
  },
});

export default Concert;
