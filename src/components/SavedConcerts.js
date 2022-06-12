import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from './Header'
import useConcerts from '../hooks/useConcerts';

const SavedConcerts = ({navigation}) => {
  //Falta guardarlos en un context
  const {concerts} = useConcerts();

  return (
    <View style={styles.container}>
      <Header>Guardados</Header>
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
    backgroundColor: '#111827',
    justifyContent: 'center',
  },
});

export default SavedConcerts;
