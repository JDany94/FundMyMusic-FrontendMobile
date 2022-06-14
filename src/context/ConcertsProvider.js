import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const ConcertsContext = createContext();

const ConcertsProvider = ({children}) => {
  const [concerts, setConcerts] = useState([]);
  const [concert, setConcert] = useState({});
  const [loading, setLoading] = useState(false);

  const {auth} = useAuth();

  const getConcerts = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (!token || !auth) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axiosClient.get('/concerts', config);
      setConcerts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getConcert = async id => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('Token');
      if (!token || !auth) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axiosClient.get(`/concerts/${id}`, config);
      setConcert(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const singOutConcerts = () => {
    setConcerts([]);
    setConcert({});
  };

  return (
    <ConcertsContext.Provider
      value={{
        loading,
        setLoading,
        concerts,
        getConcerts,
        concert,
        getConcert,
        singOutConcerts,
      }}>
      {children}
    </ConcertsContext.Provider>
  );
};

export {ConcertsProvider};

export default ConcertsContext;
