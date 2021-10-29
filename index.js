//import AppNavigation from '@modules/navigation/AppNavigation';
import {AppRegistry} from 'react-native';
import AppNavigation from '@modules/navigation/AppNavigation';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => AppNavigation);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
