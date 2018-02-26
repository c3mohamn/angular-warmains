import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, UserForm } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../models/token.model';

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

  getUserToken(user: UserForm): Observable<Token> {
    console.log('get user: ', user);
    return this.http.post<Token>('/api/user/login', user);
  }
}
