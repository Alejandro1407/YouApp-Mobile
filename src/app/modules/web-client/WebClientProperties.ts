interface WebClientProperties {
  host: string;
  port: number;
}

const DefaultWebClientProperties: WebClientProperties = {
  host: 'http://10.0.40.48',
  port: 8083,
};

// eslint-disable-next-line no-undef
export type {WebClientProperties};
export {DefaultWebClientProperties};
