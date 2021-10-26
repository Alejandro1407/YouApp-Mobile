type AuthorizationFunction = (authorization: OAuth2Token) => void;

interface OAuth2Token {
  access_token?: string;
  refresh_token?: string;
  loggedIn: boolean;
  scope?: string;
  token_type?: string;
}

interface OAuth2Authorization {
  authorization: OAuth2Token;
  setAuthorization: AuthorizationFunction;
}

// eslint-disable-next-line no-undef
export type {OAuth2Authorization, OAuth2Token};
