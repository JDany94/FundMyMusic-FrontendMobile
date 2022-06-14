import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Searchbar} from 'react-native-paper';

import Title from './Title';
import PreviewConcert from './PreviewConcert';
import BackgroundGray from './BackgroundGray';

import useConcerts from '../hooks/useConcerts';
import {theme} from '../core/theme';

const Concerts = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  
  const {concerts} = useConcerts();

  const filter =
    searchQuery === ''
      ? []
      : concerts.filter(concert =>
          concert.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

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

  //TODO hacer el carousel de pocas entradas
  
  return (
    <BackgroundGray>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Buscar"
          placeholderTextColor={theme.colors.gray}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        {searchQuery.length > 0 && (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filter.length ? (
                filter.map(concert => (
                  <PreviewConcert
                    key={concert._id}
                    concert={concert}
                    navigation={navigation}
                  />
                ))
              ) : (
                <Text style={styles.noConcert}>
                  No se ha encontrado nada...
                </Text>
              )}
            </ScrollView>
          </>
        )}

        <Title style={styles.title}>Nuevos</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {concerts.length ? (
            concerts
              .map(concert => (
                <PreviewConcert
                  key={concert._id}
                  concert={concert}
                  navigation={navigation}
                />
              ))
              .reverse()
          ) : (
            <Text style={styles.noConcert}>No hay conciertos publicados</Text>
          )}
        </ScrollView>

        <Title style={styles.title}>Próximamente</Title>
        <View style={styles.sevenDays}>
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
              <Text style={styles.noConcert}>No hay conciertos publicados</Text>
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
            <Text style={styles.noConcert}>No hay conciertos publicados</Text>
          )}
        </View>
      </ScrollView>
    </BackgroundGray>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.bgBottomBar,
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 12,
  },
  sevenDays: {
    backgroundColor: 'rgba(153, 27, 27, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: theme.colors.text,
    margin: 10,
  },
  mostSold: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 80,
  },
  noConcert: {
    marginVertical: 15,
    marginHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.colors.text,
  },
});

export default Concerts;
