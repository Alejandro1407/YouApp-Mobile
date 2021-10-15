import {PathParam} from '@src/app/models/PathParam';
import {Component} from 'react';

export class WebClient extends Component {
  static getInstance(props?): WebClient {
    return new WebClient(props);
  }

  async get(uri: string, pathParams?: Array<PathParam>): Promise<Response> {
    let url = new URL(uri);
    try {
      pathParams?.forEach(k => url.searchParams.append(k.key, k.value));
      return fetch(url.toString(), {
        method: 'GET',
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async post(
    uri: string,
    body?: string,
    pathParams?: Array<PathParam>,
  ): Promise<Response> {
    let url = new URL(uri);
    try {
      pathParams?.forEach(k => url.searchParams.append(k.key, k.value));
      console.log(url.toString());
      return fetch(url.toString(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
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
