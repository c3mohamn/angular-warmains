import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, UserForm } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(token: Token) {
    // Store in localstorage?
    localStorage.setItem('token', token.token);
  }

  logout() {
    // Removes localStorage token
    // Removes user's token in db
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return false;
  }

  getCurrentUser(): void {
    // Get current user info from token in localStorage
  }

  refreshToken(): void {
    // Refresh current users token expiry date
  }

  validateToken(token: Token) {
    console.log('validating token', token);
    // Check if token is expired
    // Cross-ref token with user's token in db
    // Refresh token
    // This should only be done when site first entered / refreshes
  }

}
