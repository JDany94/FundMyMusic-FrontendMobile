import React, {useEffect} from 'react';

import BottomNav from '../components/BottomNavigation';

import useConcerts from '../hooks/useConcerts';

const Dashboard = ({navigation}) => {
  const {getConcerts} = useConcerts();

  useEffect(() => {
    getConcerts();
  }, []);

  return <BottomNav navigation={navigation} />;
};

export default Dashboard;
