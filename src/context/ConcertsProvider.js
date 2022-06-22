import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const ConcertsContext = createContext();

const ConcertsProvider = ({children}) => {
  const [concerts, setConcerts] = useState([]);
  const [concert, setConcert] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadBuy, setLoadBuy] = useState(false);

  const {auth, setAuth} = useAuth();

  const getConcerts = async () => {
    try {
      const {data} = await axiosClient.get('/concerts');
      setConcerts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getConcert = async id => {
    try {
      setLoading(true);      
      const {data} = await axiosClient.get(`/concerts/${id}`);
      setConcert(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const savedConcertChange = async savedConcerts => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axiosClient.post(
        `/concerts/user-saved-concerts`,
        {savedConcerts},
        config,
      );
      setAuth(data);
    } catch (error) {
      console.log(error);
    }
  };

  const buyTickets = async (concert, numberTickets) => {
    try {
      setLoadBuy(true);
      const token = await AsyncStorage.getItem('Token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const newTicket = {
        concert,
        quantity: numberTickets,
      };
      const {data} = await axiosClient.post(
        `/concerts/purchased-tickets`,
        newTicket,
        config,
      );
      setAuth(data);
      setLoadBuy(false);
      return true;
    } catch (error) {
      console.log(error);
      setLoadBuy(false);
      return false;
    }
  };

  const singOutConcerts = () => {
    setConcerts([]);
    setConcert({});
  };

  return (
    <ConcertsContext.Provider
      value={{
        concerts,
        getConcerts,
        concert,
        getConcert,
        loading,
        loadBuy,
        savedConcertChange,
        buyTickets,
        singOutConcerts,
      }}>
      {children}
    </ConcertsContext.Provider>
  );
};

export {ConcertsProvider};

export default ConcertsContext;
