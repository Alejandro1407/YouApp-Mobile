export interface OAuth2TokenResponse {
  access_token:string;
  expires_in?: number;
  id_token?: string;
  refresh_token: string;
  scope?: string;
  token_type?: string;
}
