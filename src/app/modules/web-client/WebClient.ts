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

  async get(
    path: string,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    return this.doRequest(
      'GET',
      path,
      pathParams,
      undefined,
      additionalHeaders,
    );
  }

  async delete(
    path: string,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    return this.doRequest(
      'DELETE',
      path,
      pathParams,
      undefined,
      additionalHeaders,
    );
  }

  async post(
    path: string,
    body?: BodyInit_,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    return this.doRequest('POST', path, pathParams, body, additionalHeaders);
  }

  async post_x_encoded(
    path: string,
    body: {[key: string]: string | undefined},
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    var formBody: Array<String> = [];
    Object.entries(body).forEach(([k, v]): void => {
      let encodeKey = encodeURIComponent(k);
      let encodeValue = encodeURIComponent(v);
      formBody.push(encodeKey + '=' + encodeValue);
    });
    let rawBody = formBody.join('&');
    console.log(rawBody);
    return this.doRequest('POST', path, pathParams, rawBody, additionalHeaders);
  }

  async put(
    path: string,
    body?: BodyInit_,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    return this.doRequest('PUT', path, pathParams, body, additionalHeaders);
  }

  private processUri(
    path: string,
    pathParams?: {[key: string]: string},
  ): string {
    let removeSlash: boolean = !path.endsWith('/');
    let uri = `${this.props.host}:${this.props.port}${path}`;
    let url = new URL(uri);
    if (pathParams !== undefined) {
      Object.entries(pathParams).forEach(([k, v]): void =>
        url.searchParams.append(k, v),
      );
    }
    return removeSlash === true
      ? url.toString().replace(/\/([^/]*)$/, '$1')
      : url.toString();
  }

  private doRequest(
    method: string,
    path: string,
    pathParams?: {[key: string]: string},
    body?: BodyInit_,
    additionalHeaders?: {[key: string]: string},
  ): Promise<Response> {
    return fetch(this.processUri(path, pathParams), {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
      body: body,
    }).then(x => {
      if (!x.ok) {
        console.log(x.ok);
        console.log(x.statusText);
        return Promise.reject(x.json());
      } else {
        return x.json();
      }
    });
  }
}
