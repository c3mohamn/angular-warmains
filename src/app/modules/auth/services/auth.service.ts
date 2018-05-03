import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Redux from 'redux';
import * as UserActions from '../../../states/user/user.actions';
import { UserTokenInfo, User } from '../../../models/user.model';
import { AppStore } from '../../../states/app.store';
import { AppState } from '../../../states/app.reducer';
import { UserService } from '../../api/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) {}
  user: UserTokenInfo;

  login(user: User) {
    localStorage.setItem('token', user.token);
    this.user = this.decryptToken(user.token);
    this.store.dispatch(UserActions.setCurrentUser(user));
    console.log('User logged in: ', this.user.username);
  }

  logout() {
    // Removes localStorage token
    // Removes user's token in db
    localStorage.removeItem('token');
    if (this.user && this.user.username) {
      this.userService
        .removeUserToken(this.user.username)
        .subscribe(
          data => console.log(data),
          error => console.log(error.error)
        );
    }
    this.store.dispatch(UserActions.unsetCurrentUser());
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

  getUsername(): string {
    if (this.user) {
      return this.user.username;
    } else {
      return '';
    }
  }

  validateToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.validateToken(token).subscribe(
        data => {
          console.log(data);
          this.login(data);
        },
        error => {
          console.log(error.error);
          this.logout();
        }
      );
    }
  }

  // decrypts the token in localStorage and returns result to be used for currentUser
  decryptToken(token: string): UserTokenInfo {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const currentUser = <UserTokenInfo>JSON.parse(window.atob(base64));
    return currentUser;
  }
}