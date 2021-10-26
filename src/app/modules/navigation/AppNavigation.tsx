import SplashScreen from '@screens/SplashScreen';
import HomeScreen from '@screens/HomeScreen';
import {Login} from '@modules/login/Login';
import Register from '../register/Register';
import recoverPasswordScreen from '../recover/Recover';
import React, {useContext} from 'react';
import {OAuth2Context} from '@src/app/environment/OAuth2Context';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OAuth2ContextProvider} from '../auth/OAuth2ContextProvider';

const AppNavigation = () => {
  const {authorization} = useContext(OAuth2Context);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        {authorization.loggedIn !== true ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Recover" component={recoverPasswordScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
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
