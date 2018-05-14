export interface User {
  id: string;
  username: string;
  email: string;
  role: number;
  token: string;
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
