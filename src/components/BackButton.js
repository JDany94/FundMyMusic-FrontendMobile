import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {theme} from '../core/theme';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <MaterialCommunityIcons
        name="chevron-left"
        color={theme.colors.text}
        size={45}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
  },
});

export default BackButton;
