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

  async get<T = {[key: string]: string}>(
    path: string,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<T> {
    return this.doRequest<T>(
      'GET',
      path,
      pathParams,
      undefined,
      additionalHeaders,
    );
  }

  async delete<T = {[key: string]: string}>(
    path: string,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<T> {
    return this.doRequest<T>(
      'DELETE',
      path,
      pathParams,
      undefined,
      additionalHeaders,
    );
  }

  async post<T = {[key: string]: string}>(
    path: string,
    body?: BodyInit_,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<T> {
    return this.doRequest<T>('POST', path, pathParams, body, additionalHeaders);
  }

  async post_x_encoded<T = {[key: string]: string}>(
    path: string,
    body: {[key: string]: string | undefined},
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<T> {
    var formBody: Array<String> = [];
    Object.entries(body).forEach(([k, v]): void => {
      let encodeKey = encodeURIComponent(k);
      let encodeValue = encodeURIComponent(v!);
      formBody.push(encodeKey + '=' + encodeValue);
    });
    let rawBody = formBody.join('&');
    return this.doRequest<T>(
      'POST',
      path,
      pathParams,
      rawBody,
      additionalHeaders,
    );
  }

  async put<T = {[key: string]: string}>(
    path: string,
    body?: BodyInit_,
    pathParams?: {[key: string]: string},
    additionalHeaders?: {[key: string]: string},
  ): Promise<T> {
    return this.doRequest<T>('PUT', path, pathParams, body, additionalHeaders);
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

  private doRequest<T>(
    method: string,
    path: string,
    pathParams?: {[key: string]: string},
    body?: BodyInit_,
    additionalHeaders?: {[key: string]: string},
  ): Promise<T> {
    return fetch(this.processUri(path, pathParams), {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
      body: body,
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise)); //  Promise.reject(response.json());
      } else {
        return response.text().then(content => {
          return content.length > 0 ? (JSON.parse(content) as T) : ({} as T);
        });
      }
    });
  }
}
