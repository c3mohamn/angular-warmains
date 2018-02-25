export interface User {
  id: string;
  username: string;
  email: string;
  created: Date;
  last_seen: Date;
  role: number;
  favorites: any[];
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}
