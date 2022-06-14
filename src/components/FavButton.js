import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';
import useAuth from '../hooks/useAuth';

const FavButton = ({navigation}) => {
  const [color, setColor] = useState(theme.colors.text);

  const {auth} = useAuth();
  const {concert, savedConcertChange} = useConcerts();

  useEffect(() => {
    if (auth.savedConcerts.includes(concert._id)) {
      setColor(theme.colors.primary);
    }
  }, []);

  const handleFav = () => {
    const findConcert = auth.savedConcerts.includes(concert._id);
    if (findConcert) {
      let i = auth.savedConcerts.indexOf(concert._id);
      if (i !== -1) auth.savedConcerts.splice(i, 1);
      setColor(theme.colors.text);
    } else {
      auth.savedConcerts.push(concert._id);
      setColor(theme.colors.primary);
    }
    savedConcertChange(auth.savedConcerts);
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
    marginTop: 5,
  },
});

export default FavButton;
