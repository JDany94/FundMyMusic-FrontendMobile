import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import {Button} from 'react-native-paper';
import PreviewConcertSaved from './PreviewConcertSaved';
import BackgroundGray from './BackgroundGray';
import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';
import useAuth from '../hooks/useAuth';

const SavedConcerts = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {concerts, getConcerts} = useConcerts();
  const {auth, loadUserData} = useAuth();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadUserData();
    getConcerts();
    setRefreshing(false);
  }, []);

  const handleSingIn = () => {
    navigation.navigate('SingIn');
  };
  const handleSingUp = () => {
    navigation.navigate('SingUp');
  };

  const filter =
    auth.name !== 'null'
      ? auth.savedConcerts.length === 0
        ? []
        : concerts.filter(concert => auth.savedConcerts.includes(concert._id))
      : [];

  return (
    <BackgroundGray>
      {auth.name !== 'null' ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.concerts}>
            {filter.length ? (
              filter.map(concert => (
                <PreviewConcertSaved
                  key={concert._id}
                  concert={concert}
                  navigation={navigation}
                />
              ))
            ) : (
              <View style={styles.noConcert}>
                <Text style={styles.noConcertText}>
                  No hay conciertos guardados
                </Text>
                <Image
                  source={require('../assets/logo-alert.png')}
                  style={styles.image}
                />
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.textGray}>
            Debes iniciar sesión o registrarte para guardar conciertos...
          </Text>
          <Button style={styles.button} mode="contained" onPress={handleSingIn}>
            Iniciar Sesión
          </Button>
          <Button style={styles.button} mode="contained" onPress={handleSingUp}>
            Registrarse
          </Button>
        </View>
      )}
    </BackgroundGray>
  );
};

const styles = StyleSheet.create({
  concerts: {
    marginBottom: 80,
  },
  noConcert: {
    flex: 1,
    alignItems: 'center',
  },
  noConcertText: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.colors.text,
  },
  image: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  textGray: {
    fontSize: 17,
    textAlign: 'justify',
    width: '100%',
    marginVertical: 6,
    fontWeight: 'bold',
    color: theme.colors.gray,
  },
  button: {
    borderRadius: 25,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
});

export default SavedConcerts;
