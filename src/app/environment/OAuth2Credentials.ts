/* eslint-disable @typescript-eslint/no-unused-vars */
import {OAuth2Configuration} from '@models/OAuth2Configuration';
import {OAuth2Type} from '@enums/OAuth2Type';
import {ConfigureParams} from '@react-native-google-signin/google-signin/lib/typescript/types';
import {DefaultOAuth2Enviroment} from './OAuth2Enviroment';

const YouAppCredentials: OAuth2Configuration = {
  registration: OAuth2Type.YOUAPP,
  configuration: {
    issuer: `${DefaultOAuth2Enviroment.host}:${DefaultOAuth2Enviroment.port}`,
    clientId: 'youapp',
    clientAuthMethod: 'post',
    redirectUrl: 'youapp://oauth',
    scopes: ['openid'],
    clientSecret: '9d[?hr%[Y>w~nV3_',
    additionalParameters: {
      ClientAuthenticationMethod: 'client_secret_post',
    },
    dangerouslyAllowInsecureHttpRequests: true,
  },
};

const GoogleCredentials: ConfigureParams = {
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/user.birthday.read',
    'https://www.googleapis.com/auth/user.gender.read',
  ],
  webClientId:
    '594103153319-gm26n3kirsecq2kfl52fsh2p5ejd09qp.apps.googleusercontent.com',
  offlineAccess: false,
};

export {YouAppCredentials, GoogleCredentials};
