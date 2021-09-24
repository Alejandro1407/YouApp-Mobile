import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Login} from './src/modules/login/Login';

AppRegistry.registerComponent(appName, () => Login);
