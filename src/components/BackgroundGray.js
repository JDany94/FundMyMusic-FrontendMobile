import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../core/theme';

const BackgroundGray = ({children}) => {
  return <View style={styles.background}>{children}</View>;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default BackgroundGray;
