import React from 'react';
import {StyleSheet, View} from 'react-native';

import Title from '../components/Title';
import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';

const Concert = ({navigation}) => {
  const {concert} = useConcerts();

  //TODO: Hacer loading aqui y en todas donde se use {loading && <ActivityIndicator animating={true} />}
  return (
    <View style={styles.container}>
      <Title>{concert.title}</Title>
    </View>
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
    justifyContent: 'center',
  },
});

export default Concert;
