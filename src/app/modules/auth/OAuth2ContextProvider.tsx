import {OAuth2Token} from '@src/app/models/OAuth2Authorization';
import {useEffect, useState} from 'react';
import * as keychain from 'react-native-keychain';
import {OAuth2Context} from '@environment/OAuth2Context';
import React from 'react';
import {ToastAndroid} from 'react-native';

const OAuth2ContextProvider = ({children}) => {
  const USERNAME = 'youapp';
  const [credentials, setCredentials] = useState<OAuth2Token>({
    loggedIn: false,
  });

  const getAuthState = async (_logged: boolean = false) => {
    try {
      const payload: false | keychain.UserCredentials =
        await keychain.getGenericPassword();
      if (payload) {
        const token: OAuth2Token = JSON.parse(payload.password);
        if (_logged) {
          token.loggedIn = false;
        }
        setCredentials(token);
      }
    } catch (err) {
      ToastAndroid.show('No session detected', ToastAndroid.SHORT);
    }
  };

  const setAuthState = async (token: OAuth2Token) => {
    try {
      setCredentials(token);
      await keychain.setGenericPassword(USERNAME, JSON.stringify(token));
    } catch (error) {
      console.error('Failed to update auth state');
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState(true);
  }, []);

  return (
    <OAuth2Context.Provider
      value={{authorization: credentials, setAuthorization: setAuthState}}>
      {children}
    </OAuth2Context.Provider>
  );
};

export {OAuth2ContextProvider};
