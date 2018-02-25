import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, NewUser } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiUserService {
  result: User[];

  constructor(private http: HttpClient) { }

  // getUsers() {
  //   return this._http.get('/api/user/getAll')
  //     .map(result => this.result = result.json().data);
  // }

  getUsers(): Observable<User[]> {
    console.log('getting all users');
    return this.http.get<User[]>('/api/user/getAll', {});
  }

  registerUser(newUser: NewUser): Observable<User> {
    console.log('registering new user: ', newUser);
    return this.http.post<User>('/api/user/register', newUser);
  }
}
