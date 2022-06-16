import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosClient from '../config/axiosClient';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);

  const validName = val => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      val,
    );
  };

  const singIn = async (email, password) => {
    try {
      setLoading(true);
      const {data} = await axiosClient.post(`/user/auth`, {
        email,
        password,
        from: 'User',
      });
      await AsyncStorage.setItem('Token', data.token);
      setAuth(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const singUp = async user => {
    try {
      setLoading(true);
      const {data} = await axiosClient.post(`/user`, user);
      await AsyncStorage.setItem('Token', data.token);
      setAuth(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('Token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axiosClient.get('/user/profile', config);
      setAuth(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const editProfile = async user => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('Token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axiosClient.put(`/user/profile`, user, config);
      setAuth(data);
      setLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
    }
  };

  const singOutAuth = async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setAuth({});
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        singIn,
        singUp,
        loadUserData,
        editProfile,
        singOutAuth,
        validName,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};

export default AuthContext;
