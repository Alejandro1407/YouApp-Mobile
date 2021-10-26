import React from 'react';
import {OAuth2Authorization} from '../models/OAuth2Authorization';

const OAuth2Context = React.createContext<OAuth2Authorization>({
  authorization: {loggedIn: false},
  setAuthorization: () => {},
});

export {OAuth2Context};
