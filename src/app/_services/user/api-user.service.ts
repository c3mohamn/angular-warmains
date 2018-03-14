import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, UserForm } from '../../_models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiUserService {
  constructor(private http: HttpClient) { }

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
    return this.http.post<User>('/api/user/removeToken', { username: username });
  }

  validateToken(token: string): Observable<User> {
    console.log('validating user token');
    return this.http.post<User>('/api/user/validateToken', { token: token });
  }
}