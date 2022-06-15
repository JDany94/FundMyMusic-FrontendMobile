import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
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
    getConcerts();
    loadUserData();
    setRefreshing(false);
  }, []);

  const filter = concerts => {
    let response = [];
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
    return response;
  };

  return (
    <BackgroundGray>
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
              <Text style={styles.noConcertText}>No hay boletos comprados</Text>
              <Image
                source={require('../assets/logo-alert.png')}
                style={styles.image}
              />
            </View>
          )}
        </View>
      </ScrollView>
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
});

export default Tickets;
