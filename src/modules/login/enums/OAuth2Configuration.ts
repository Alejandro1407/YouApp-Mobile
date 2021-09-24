import {AuthConfiguration} from 'react-native-app-auth';
import {OAuth2Type} from './OAuth2Type';

export interface OAuth2Configuration {
  registration: OAuth2Type;
  configuration: AuthConfiguration;
}
