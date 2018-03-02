export interface User {
  id: string;
  username: string;
  email: string;
  created: Date;
  last_seen: Date;
  role: number;
  favorites: any[];
}

export interface UserForm {
  username: string;
  email: string;
  password: string;
}

export interface UserTokenInfo {
  username: string;
  role: number;
  iat: number;
  exp: number;
}
