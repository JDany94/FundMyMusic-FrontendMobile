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
import PreviewConcertTickets from './PreviewConcertTickets';
import BackgroundGray from './BackgroundGray';
import {theme} from '../core/theme';

import useConcerts from '../hooks/useConcerts';
import useAuth from '../hooks/useAuth';

const Tickets = ({navigation}) => {
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

  const filter = concerts => {
    let response = [];
    if (auth.name !== 'null') {
      for (let j = 0; j < concerts.length; j++) {
        for (let i = 0; i < auth.purchasedTickets.length; i++) {
          if (
            JSON.stringify(auth.purchasedTickets[i].concert) ===
            JSON.stringify(concerts[j]._id)
          ) {
            response.push(concerts[j]);
          }
        }
      }
    }
    return response;
  };

  return (
    <BackgroundGray>
      {auth.name !== 'null' ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.concerts}>
            {auth.purchasedTickets.length ? (
              filter(concerts).map(concert => (
                <PreviewConcertTickets
                  key={concert._id}
                  concert={concert}
                  navigation={navigation}
                />
              ))
            ) : (
              <View style={styles.noConcert}>
                <Text style={styles.noConcertText}>
                  No hay boletos comprados
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
            Debes iniciar sesión o registrarte para ver tus boletos...
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

export default Tickets;
