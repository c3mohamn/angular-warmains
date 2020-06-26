import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForm } from '../../../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Save new user to db.
   * @param newUser User information
   */
  createUser(newUser: UserForm): Observable<User> {
    console.log('creating new user: ', newUser);
    return this.http.post<User>('/api/user/register', newUser);
  }

  /**
   * Log current user in by saving and distributing new token.
   * @param user User information
   */
  loginUser(user: UserForm): Observable<User> {
    console.log('login user: ', user);
    return this.http.post<User>('/api/user/login', user);
  }

  /**
   * Removes current user's token from backend.
   * @param username
   */
  removeUserToken(username: string): Observable<User> {
    console.log('remove user token');
    return this.http.post<User>('/api/user/removeToken', {
      username: username
    });
  }

  /**
   * Validate token and distribute a new token for current user.
   * @param token user token string
   */
  validateToken(token: string): Observable<User> {
    console.log('validating user token');
    return this.http.post<User>('/api/user/validateToken', { token: token });
  }
}
