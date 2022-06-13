import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

const Title = props => {
  return <Text style={styles.title} {...props} />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: theme.colors.text,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Title;
