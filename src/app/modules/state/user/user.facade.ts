import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, defer } from 'rxjs';

import * as userActions from './user.actions';
import { UserState } from './user.reducer';
import { UserQuery } from './user.selector';
import { UserService } from '../../api/services/user.service';

@Injectable()
export class UserFacade {
  user$ = this.store.select(UserQuery.getCurrentUser);
  isLoggedIn$ = this.store.select(UserQuery.isLoggedIn);

  constructor(private actions$: Actions, private store: Store<UserState>) {}

  clearUser() {
    this.store.dispatch(new userActions.ClearUserMe());
  }

  refreshUser() {
    this.store.dispatch(new userActions.GetUserMe());
  }

  logoutUser() {
    this.store.dispatch(new userActions.UserLogout());
  }
}
