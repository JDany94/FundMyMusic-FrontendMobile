import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function BackgroundDashboard({children}) {
  return <View style={styles.background}>{children}</View>;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#111827',
  },
});
