import {AuthConfiguration} from 'react-native-app-auth';
import {OAuth2Type} from '../enums/OAuth2Type';

export interface OAuth2Configuration {
  registration: OAuth2Type;
  configuration: AuthConfiguration;
}
