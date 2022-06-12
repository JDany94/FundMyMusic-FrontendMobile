import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function BackButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
  },
  image: {
    flex: 1,
    width: 30,
    height: 30,
  },
});
