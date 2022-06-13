import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = () => {
  return <Image source={require('../assets/logo.png')} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 240,
    height: 128,
    marginBottom: 40,
  },
});

export default Logo;
