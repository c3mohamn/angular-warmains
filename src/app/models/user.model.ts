export interface User {
  id: string;
  user_name: string;
  email: string;
  created: Date;
  last_seen: Date;
  rank: number;
  favorites: any[];
}
