import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

import Title from './Title';
import PreviewConcert from './PreviewConcert';
import BackgroundGray from './BackgroundGray';

import useConcerts from '../hooks/useConcerts';
import {theme} from '../core/theme';

const Concerts = ({navigation}) => {
  const {concerts} = useConcerts();

  const sevenDays = concert => {
    const concertDate = new Date(concert.date.split('T')[0]);
    const today = new Date();
    const seven = new Date();
    seven.setDate(seven.getDate() + 7);
    if (concertDate < seven && concertDate > today) return true;
    return false;
  };

  const mostSold = concerts => {
    return concerts.sort((a, b) => b.sold - a.sold).slice(0, 4);
  };

  return (
    <BackgroundGray>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Title>Buscador</Title>
        </View>

        <View style={styles.container}>
          <Title style={styles.title}>Nuevos</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {concerts.length ? (
              concerts
                .reverse()
                .map(concert => (
                  <PreviewConcert
                    key={concert._id}
                    concert={concert}
                    navigation={navigation}
                  />
                ))
            ) : (
              <Text style={styles.noPubli}>No hay conciertos publicados</Text>
            )}
          </ScrollView>

          <Title style={styles.title}>Próximamente</Title>
          <View style={styles.prox}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {concerts.length ? (
                concerts.map(concert =>
                  sevenDays(concert) ? (
                    <PreviewConcert
                      key={concert._id}
                      concert={concert}
                      navigation={navigation}
                    />
                  ) : null,
                )
              ) : (
                <Text style={styles.noPubli}>No hay conciertos publicados</Text>
              )}
            </ScrollView>
          </View>

          <Title style={styles.title}>Más Vendidos</Title>
          <View style={styles.mostSold}>
            {concerts.length ? (
              mostSold(concerts).map(concert => (
                <PreviewConcert
                  key={concert._id}
                  concert={concert}
                  space={true}
                  navigation={navigation}
                />
              ))
            ) : (
              <Text style={styles.noPubli}>No hay conciertos publicados</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </BackgroundGray>
  );
};

const styles = StyleSheet.create({
  prox: {
    backgroundColor: 'rgba(153, 27, 27, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: theme.colors.text,
    margin: 10
  },
  mostSold: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 80,
  },
  noPubli: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.colors.text,
  },
});

export default Concerts;
