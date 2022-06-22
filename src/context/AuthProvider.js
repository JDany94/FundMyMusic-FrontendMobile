import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosClient from '../config/axiosClient';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({name: 'null'});
  const [loading, setLoading] = useState(false);

  const singIn = async ({email, password}) => {
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
      return {response: true};
    } catch (error) {
      console.log(error);
      setLoading(false);
      return {response: false, error};
    }
  };

  const singUp = async user => {
    try {
      setLoading(true);
      const {data} = await axiosClient.post(`/user`, user);
      await AsyncStorage.setItem('Token', data.token);
      setAuth(data);
      setLoading(false);
      return {response: true};
    } catch (error) {
      console.log(error);
      setLoading(false);
      return {response: false, error};
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
      return {response: true};
    } catch (error) {
      console.log(error);
      setLoading(false);
      return {response: false, error};
    }
  };

  const forgotPassword = async user => {
    try {
      const {email} = user;
      setLoading(true);
      const {data} = await axiosClient.post(`/user/reset-password`, {email});
      setLoading(false);
      return {response: true, msg: data.msg};
    } catch (error) {
      console.log(error);
      setLoading(false);
      return {response: false, error};
    }
  };

  const singOutAuth = async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setAuth({name: 'null'});
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
        forgotPassword,
        singOutAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};

export default AuthContext;
