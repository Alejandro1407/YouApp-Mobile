import AppNavigation from '@modules/navigation/AppNavigation';
import {Login} from '@src/app/modules/login/Login';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigation);
