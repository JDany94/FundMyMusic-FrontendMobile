import React from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';

import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';

const PreviewConcert = ({navigation, concert, space}) => {
  const {title, _id, place, date, FlyerURL} = concert;

  const {getConcert} = useConcerts();

  const handleConcert = () => {
    getConcert(_id);
    navigation.navigate('Concert');
  };

  return (
    <Pressable onPress={handleConcert}>
      <View style={space ? {margin: 15} : {marginVertical: 10, marginHorizontal: 8}}> 
        <Image
          style={styles.img}
          source={{
            uri: FlyerURL,
          }}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.date}>
          {date.split('T')[0].split('-').reverse().join().replace(/,/g, '/')}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 20,
    width: 150,
    height: 200,
  },
  title: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    width: 150,
    fontSize: 16,
  },
  place: {
    color: theme.colors.gray,
    width: 150,
    fontSize: 12,
  },
  date: {
    color: theme.colors.gray,
    width: 150,
    fontSize: 12,
  },
});

export default PreviewConcert;
