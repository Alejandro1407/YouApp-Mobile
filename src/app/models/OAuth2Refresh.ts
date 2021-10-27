export interface OAuth2Refresh{
  access_token:string;
  expires_in?: number;
  id_token?: string;
  refresh_token: string;
  scope?: string;
  token_type?: string;

}