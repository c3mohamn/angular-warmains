import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, UserForm, UserTokenInfo } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  user: UserTokenInfo;

  login(token: Token) {
    localStorage.setItem('token', token.token);
    this.user = this.decryptToken(token.token);
    console.log('User logged in: ', this.user.username);
  }

  logout() {
    // Removes localStorage token
    // Removes user's token in db
    localStorage.removeItem('token');
    this.user = null;
    console.log('Logging user out');
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getCurrentUser(): UserTokenInfo {
    const token = localStorage.getItem('token');

    if (token) {
      this.user = this.decryptToken(token);
      console.log('Getting current logged in user: ', this.user.username);
      return this.user;
    }
    console.log('No user logged in at the moment.');

    return null;
  }

  // decrypts the token in localStorage and returns result to be used for currentUser
  decryptToken(token: string):  UserTokenInfo {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const currentUser = <UserTokenInfo>JSON.parse(window.atob(base64));
    return currentUser;
  }

  refreshToken(): void {
    // Refresh current users token expiry date
    // Post refresh token in db
    // Set new token in localStorage
  }

  validateToken(token: Token) {
    console.log('validating token', token);
    // TODO:
    // Check if token is expired
    // Check if valid creds stored in token
    // Either logout user OR refresh token & set token
  }

}
