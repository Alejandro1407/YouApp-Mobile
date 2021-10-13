import AppNavigation from '@modules/navigation/AppNavigation';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigation);
