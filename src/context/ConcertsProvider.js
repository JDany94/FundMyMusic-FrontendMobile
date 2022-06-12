import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';

const ConcertsContext = createContext();

const ConcertsProvider = ({children}) => {
  const [concerts, setConcerts] = useState([]);
  const [concert, setConcert] = useState({});

  const {auth, setAuth} = useAuth();

  //useEffect(() => {
  //  const getConcerts = async () => {
  //    try {
  //      const token = await AsyncStorage.getItem('Token');
  //
  //      const config = {
  //        headers: {
  //          'Content-Type': 'application/json',
  //          Authorization: `Bearer ${token}`,
  //        },
  //      };
  //      const {data} = await axiosClient.get('/concerts', config);
  //      setConcerts(data);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };
  //  getConcerts();
  //}, [auth]);

  const validName = val => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      val,
    );
  };

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

  //Hacer
  const getConcert = async id => {
    try {
      const token = localStorage.getItem('x-auth-token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const {data} = await axiosClient.get(`/concerts/artist/${id}`, config);
      setConcert(data);
    } catch (error) {
      showAlert({
        msg: 'Error de conexión',
        error: true,
      });
      console.log(error);
      navigate('/dashboard');
    }
  };

  const singOutConcerts = () => {
    setConcerts([]);
    setConcert({});
  };

  //Hacer
  const editProfile = async user => {
    try {
      const token = localStorage.getItem('x-auth-token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const {data} = await axiosClient.put(`/user/profile`, user, config);
      setAuth(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Perfil editado correctamente',
        showConfirmButton: false,
        timer: 1500,
        color: '#fff',
        background: '#111827',
      });
      navigate(`/dashboard/profile`);
    } catch (error) {
      showAlert({
        msg: 'Error de conexión',
        error: true,
      });
      console.log(error);
      navigate('/dashboard');
    }
  };

  return (
    <ConcertsContext.Provider
      value={{
        concerts,
        getConcerts,
        concert,
        getConcert,
        singOutConcerts,
        editProfile,
        validName,
      }}>
      {children}
    </ConcertsContext.Provider>
  );
};

export {ConcertsProvider};

export default ConcertsContext;
