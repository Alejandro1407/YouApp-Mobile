import {DefaultOAuth2Enviroment} from '@environment/OAuth2Enviroment';

interface WebClientProperties {
  host: string;
  port: number;
}

const DefaultWebClientProperties: WebClientProperties = {
  host: DefaultOAuth2Enviroment.host,
  port: DefaultOAuth2Enviroment.port,
};

// eslint-disable-next-line no-undef
export type {WebClientProperties};
export {DefaultWebClientProperties};
