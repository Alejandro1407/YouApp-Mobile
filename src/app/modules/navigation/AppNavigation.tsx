import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '@screens/SplashScreen';
import HomeScreen from '@screens/HomeScreen';
import {Login} from '@modules/login/Login';
import Register from '../Register/Register';
import recoverPasswordScreen from '../recoverPassword/recoverPassword';


const AppNavigation = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register:{
    screen: Register,
    navigationOptions:{
        headerShown: false,
    }
  },
  recoverPassword:{
    screen: recoverPasswordScreen,
    navigationOptions:{
        headerShown: false,
    }
  },
});

export default createAppContainer(AppNavigation);
