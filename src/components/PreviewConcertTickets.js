import React from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';

import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';
import useAuth from '../hooks/useAuth';

const PreviewConcertTickets = ({navigation, concert}) => {
  const {title, _id, place, date, FlyerURL, genre, price, capacity, sold} = concert;

  const {getConcert} = useConcerts();
  const {auth} = useAuth();

  const handleConcert = () => {
    getConcert(_id);
    navigation.navigate('ConcertTicket');
  };

  const getQuantity = (id) => {
    for (let i = 0; i < auth.purchasedTickets.length; i++) {
      if (
        JSON.stringify(auth.purchasedTickets[i].concert) ===
        JSON.stringify(id)
      ) {
        return auth.purchasedTickets[i].quantity;
      }
    }
  };

  return (
    <Pressable onPress={handleConcert}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: FlyerURL,
          }}
        />
        <View style={styles.data}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{genre}</Text>
          <Text style={styles.text}>{place}</Text>
          <Text style={styles.text}>Entradas: {getQuantity(_id)}</Text>
          <Text style={styles.date}>
            {date.split('T')[0].split('-').reverse().join().replace(/,/g, '/')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
//TODO revisar no concerts saved
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  data: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  img: {
    borderRadius: 20,
    width: 110,
    height: 140,
  },
  title: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: theme.colors.gray,
    fontSize: 15,
  },
  date: {
    color: theme.colors.gray,
    fontSize: 14,
  },
});

export default PreviewConcertTickets;
