import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackgroundDashboard from '../components/BackgroundDashboard';
import Header from '../components/Header';
import Button from '../components/Button';

export default function Dashboard({navigation}) {
  return (
    <BackgroundDashboard>
      <View style={styles.container}>
        <Header>Dashboard</Header>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.replace('SingIn')}>
          Cerrar Sesión
        </Button>
      </View>
    </BackgroundDashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 25,
  },
});
