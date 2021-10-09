/* eslint-disable @typescript-eslint/no-unused-vars */
import {OAuth2Configuration} from '@youapp/modules/login/enums/OAuth2Configuration';
import {OAuth2Type} from '@youapp/modules/login/enums/OAuth2Type';

const credentials: Array<OAuth2Configuration> = [
  {
    registration: OAuth2Type.YOUAPP,
    configuration: {
      issuer: 'http://auth-server:8083',
      clientId: 'youapp',
      clientAuthMethod: 'post',
      redirectUrl: 'http://youappmobile/login/code',
      scopes: ['openid'],
      clientSecret: '9d[?hr%[Y>w~nV3_',
      additionalParameters: {
        ClientAuthenticationMethod: 'client_secret_post',
      },
      dangerouslyAllowInsecureHttpRequests: true,
    },
  },
  {
    registration: OAuth2Type.GOOGLE,
    configuration: {
      issuer: 'https://accounts.google.com',
      clientId:
        '594103153319-e0i9iua675j9q6pe27k2oil8ojq3p8oo.apps.googleusercontent.com',
      redirectUrl:
        'com.googleusercontent.apps.594103153319-e0i9iua675j9q6pe27k2oil8ojq3p8oo:/oauth2redirect/google',
      scopes: ['openid', 'profile'],
    },
  },
];
export {credentials};
