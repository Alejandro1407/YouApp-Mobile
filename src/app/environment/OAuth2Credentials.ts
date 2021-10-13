/* eslint-disable @typescript-eslint/no-unused-vars */
import {OAuth2Configuration} from '@models/OAuth2Configuration';
import {OAuth2Type} from '@enums/OAuth2Type';

const OAuth2Credentials: Array<OAuth2Configuration> = [
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
];
export {OAuth2Credentials};
