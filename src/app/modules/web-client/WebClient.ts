import {PathParam, queryParam} from '@src/app/models/PathParam';
import {
  DefaultWebClientProperties,
  WebClientProperties,
} from './WebClientProperties';

export class WebClient {
  private props: WebClientProperties;

  constructor(props?: WebClientProperties) {
    if (props === undefined) {
      this.props = DefaultWebClientProperties;
    } else {
      this.props = props;
    }
  }

  private processUri(path: string): string{
    return `${this.props.host}:${this.props.port}${path}`;
  }

  async get(path: string, pathParams?: Array<PathParam>): Promise<Response> {
    let url = new URL(this.processUri(path));
    try {
      pathParams?.forEach(k => url.searchParams.append(k.key, k.value));
      return fetch(url.toString(), {
        method: 'GET',
        headers: {
          // eslint-disable-next-line prettier/prettier
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async post(
    path: string,
    body?: string,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    let t = this.processUri(path);
    console.log(t);
    let url = new URL(t);
    console.log(url);
    try {
      Object.entries(pathParams).forEach(([k, v]): void =>
        url.searchParams.append(k, v),
      );
      return fetch(url.toString(), {
        method: 'POST',
        headers: {
          // eslint-disable-next-line prettier/prettier
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...additionalHeaders,
        },
        body: body,
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async put(
    path: string,
    body?: string,
    pathParams?: Array<PathParam>,
  ): Promise<Response> {
    let url = new URL(this.processUri(path));
    try {
      pathParams?.forEach(k => url.searchParams.append(k.key, k.value));
      return fetch(url.toString(), {
        method: 'PUT',
        headers: {
          // eslint-disable-next-line prettier/prettier
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
