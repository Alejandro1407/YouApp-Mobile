interface OAuth2Environment {
  host: string;
  port: number;
}

const DefaultOAuth2Enviroment: OAuth2Environment = {
  host: 'http://192.168.101.2',
  port: 8082,
};

// eslint-disable-next-line no-undef
export type {OAuth2Environment};
export {DefaultOAuth2Enviroment};
