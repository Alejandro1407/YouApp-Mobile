import SplashScreen from '@screens/SplashScreen';
import {HomeScreen} from '@screens/HomeScreen';
import {MusicScreen} from '@screens/MusicPlayer';
import {Login} from '@modules/login/Login';
import Register from '../register/Register';
import recoverPasswordScreen from '../recover/Recover';
import React, {useContext, useEffect} from 'react';
import {OAuth2Context} from '@src/app/environment/OAuth2Context';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OAuth2ContextProvider} from '../auth/OAuth2ContextProvider';
import {SearchScreen} from '@src/app/screens/SearchScreen';
import AppPlayer from '../player/AppPlayer';
import TrackPlayer from 'react-native-track-player';

const AppNavigation = () => {
  const {authorization} = useContext(OAuth2Context);
  const Stack = createNativeStackNavigator();

  const setup = async () => {
    await AppPlayer.initializePlayer();
  };

  useEffect(() => {
    setup();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        {authorization.loggedIn === false ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Recover" component={recoverPasswordScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Music" component={MusicScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <OAuth2ContextProvider>
      <AppNavigation />
    </OAuth2ContextProvider>
  );
};
