export interface Authresponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Authresponse2 {
  user: User;
}

export interface User {
  username: string;
  rol: string;
  is_active: boolean;
}

export enum AuthStatus {
  Autorizado = 'Autorizado',
  NoAutorizado = 'NoAutorizado',
  Cheking = 'Cheking',
}
