import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FavButton = ({navigation, color}) => {
  const handleFav = () => {
    console.log('FAV');
    //TODO poner state para esto en el provider
  };

  return (
    <TouchableOpacity onPress={handleFav} style={styles.container}>
      <MaterialCommunityIcons name="bookmark-outline" color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: getStatusBarHeight(),
    right: 0,
  },
});

export default FavButton;
