//import AppNavigation from '@modules/navigation/AppNavigation';
import {AppRegistry} from 'react-native';
import AppNavigation from '@modules/navigation/AppNavigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigation);
