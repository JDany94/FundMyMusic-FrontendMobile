import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosClient from '../config/axiosClient';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);
  // TODO: Solo usar setLoading aqui

  const validName = val => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      val,
    );
  };

  const editProfile = async user => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axiosClient.put(`/user/profile`, user, config);
      setAuth(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const singOutAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        setAuth,
        validName,
        editProfile,
        singOutAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};

export default AuthContext;
