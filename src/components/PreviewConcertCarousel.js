import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';

import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';

const PreviewConcertCarousel = ({navigation, concert}) => {
  const {title, _id, place, date, FlyerURL, genre, price, capacity, sold} =
    concert;

  const {getConcert} = useConcerts();

  const handleConcert = () => {
    getConcert(_id);
    navigation.navigate('Concert');
  };

  return (
    <Pressable onPress={handleConcert}>
      <ImageBackground
        source={require('../assets/back-carousel.jpg')}
        style={styles.image}
        imageStyle={styles.image}>
        <View style={styles.container}>
          <Image
            style={styles.img}
            source={{
              uri: FlyerURL,
            }}
          />
          <View style={styles.data}>
            <View style={{marginTop: 10}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{genre}</Text>
              <Text style={styles.text}>{place}</Text>
              <Text style={styles.date}>
                {date
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join()
                  .replace(/,/g, '/')}
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.text}>{price} €</Text>
              <Text style={styles.text}>
                Disponibles:{' '}
                <Text style={{color: theme.colors.primary}}>
                  {capacity - sold}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 4,
    borderRadius: 20,
  },
  container: {
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
  },
  data: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
  img: {
    borderRadius: 20,
    width: 180,
    height: 220,
  },
  title: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PreviewConcertCarousel;
