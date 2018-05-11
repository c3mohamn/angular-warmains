import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, defer } from 'rxjs';

import { UserActions } from './user.actions';
import { UserState } from './user.reducer';
import { UserQuery } from './user.selector';
import { UserService } from '../../api/services/user.service';
import { UserForm } from '../../../models/user.model';

@Injectable()
export class UserFacade {
  user$ = this.store.select(UserQuery.getCurrentUser);
  isLoggedIn$ = this.store.select(UserQuery.isLoggedIn);

  constructor(private actions$: Actions, private store: Store<UserState>) {}

  refreshUser() {
    this.store.dispatch(new UserActions.GetUser());
  }

  loginUser(user: UserForm) {
    this.store.dispatch(new UserActions.Userlogin(user));
  }

  logoutUser() {
    this.store.dispatch(new UserActions.UserLogout());
  }
}
