import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { UserActions } from './user.actions';
import { UserState } from './user.reducer';
import { UserQuery } from './user.selector';
import { UserForm, User } from '../../../models/user.model';

@Injectable()
export class UserFacade {
  user$ = this.store.select(UserQuery.getCurrentUser);
  isLoggedIn$ = this.store.select(UserQuery.isLoggedIn);

  constructor(private actions$: Actions, private store: Store<UserState>) {}

  getUser(): Observable<User> {
    return this.store.select(UserQuery.getCurrentUser);
  }

  getUserName(): Observable<string> {
    return this.store.select(UserQuery.getCurrentUserName);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.store.select(UserQuery.isLoggedIn);
  }

  getUserNotLoggedIn(): Observable<boolean> {
    return this.store.select(UserQuery.isNotLoggedIn);
  }

  validateUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(new UserActions.GetUser(token));
    }
  }

  loginUser(user: UserForm) {
    this.store.dispatch(new UserActions.Userlogin(user));
  }

  logoutUser() {
    this.store.dispatch(new UserActions.UserLogout());
  }
}
