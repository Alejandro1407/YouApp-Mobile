interface WebClientProperties {
  host: string;
  port: number;
}

const DefaultWebClientProperties: WebClientProperties = {
  host: 'http://192.168.0.17',
  port: 8083,
};

// eslint-disable-next-line no-undef
export type {WebClientProperties};
export {DefaultWebClientProperties};
