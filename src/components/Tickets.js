import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Title from './Title'
import useConcerts from '../hooks/useConcerts';

const Tickets = ({navigation}) => {
  //TODO: Guardarlos en la base y en context
  const {concerts} = useConcerts();

  return (
    <View style={styles.container}>
      <Title>Tickets</Title>
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

export default Tickets;
