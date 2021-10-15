import {User} from '@react-native-google-signin/google-signin';
import {GooglePrincipal} from './GooglePrincipal';

export interface GoogleAuthorizationRequest {
  idToken: String;
  accessToken: String;
  scopes?: Array<String>;
  serverAuthCode?: String;
  principal: any;
}