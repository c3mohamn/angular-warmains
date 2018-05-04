import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForm } from '../../../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    console.log('getting all users');
    return this.http.get<User[]>('/api/user/getAll', {});
  }

  createUser(newUser: UserForm): Observable<User> {
    console.log('creating new user: ', newUser);
    return this.http.post<User>('/api/user/register', newUser);
  }

  setUserToken(user: UserForm): Observable<User> {
    console.log('get user: ', user);
    return this.http.post<User>('/api/user/login', user);
  }

  removeUserToken(username: string): Observable<User> {
    console.log('remove user token');
    return this.http.post<User>('/api/user/removeToken', {
      username: username
    });
  }

  validateToken(token: string): Observable<User> {
    console.log('validating user token');
    return this.http.post<User>('/api/user/validateToken', { token: token });
  }
}
