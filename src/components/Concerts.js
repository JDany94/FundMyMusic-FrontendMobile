import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {Searchbar} from 'react-native-paper';

import Carousel from 'react-native-anchor-carousel';

import Title from './Title';
import PreviewConcert from './PreviewConcert';
import PreviewConcertCarousel from './PreviewConcertCarousel';

import BackgroundGray from './BackgroundGray';

import useConcerts from '../hooks/useConcerts';
import useAuth from '../hooks/useAuth';

import {theme} from '../core/theme';

const Concerts = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {concerts, getConcerts} = useConcerts();
  const {loadUserData} = useAuth();

  const onChangeSearch = query => setSearchQuery(query);

  const renderItemCarousel = ({item, index}) => {
    return (
      <PreviewConcertCarousel
        key={item._id}
        concert={item}
        navigation={navigation}
      />
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadUserData();
    getConcerts();
    setRefreshing(false);
  }, []);

  const almostSoldout = concert => {
    const availables = concert.capacity - concert.sold;
    if (availables === 0) return null;
    if ((availables / concert.capacity) * 100 < 20) {
      return concert;
    } else {
      return null;
    }
  };

  const carouselConcerts = concerts.filter(concert => almostSoldout(concert));

  const filter =
    searchQuery === ''
      ? []
      : concerts
          .filter(concert =>
            concert.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .concat(
            concerts.filter(concert =>
              concert.genre.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          )
          .concat(
            concerts.filter(concert =>
              concert.place.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          )
          .reduce((acc, item) => {
            if (!acc.includes(item)) {
              acc.push(item);
            }
            return acc;
          }, []);

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Buscar concierto, género, lugar..."
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

        <Carousel
          data={carouselConcerts}
          renderItem={renderItemCarousel}
          separatorWidth={0}
        />

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

        <Title style={styles.title}>Todos</Title>
        <View style={styles.all}>
          {concerts.length ? (
            concerts.map(concert => (
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
  },
  all: {
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
