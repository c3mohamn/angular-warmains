import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { UserActions } from './user.actions';
import { UserState } from './user.reducer';
import { UserQuery } from './user.selector';
import { UserForm } from '../../../models/user.model';
import { Talent } from '../../../models/talent.model';
import { TalentMetaInfo } from '../talent-calculator/talent-calculator.reducer';

@Injectable()
export class UserFacade {
  user$ = this.store.select(UserQuery.getCurrentUser);
  isLoggedIn$ = this.store.select(UserQuery.isLoggedIn);

  constructor(private actions$: Actions, private store: Store<UserState>) {}

  /**
   * Return current user state.
   */
  getUser(): Observable<UserState> {
    return this.store.select(UserQuery.getCurrentUser);
  }

  /**
   * Return current user's username.
   */
  getUserName(): Observable<string> {
    return this.store.select(UserQuery.getCurrentUserName);
  }

  /**
   * Return true iff current user is logged in.
   */
  getUserLoggedIn(): Observable<boolean> {
    return this.store.select(UserQuery.isLoggedIn);
  }

  /**
   * Return false iff current user is logged in.
   */
  getUserNotLoggedIn(): Observable<boolean> {
    return this.store.select(UserQuery.isNotLoggedIn);
  }

  /**
   * Opens dialog for saving talents.
   */
  openSaveTalentDialog(meta: TalentMetaInfo, username: string) {
    return this.store.dispatch(new UserActions.OpenSaveTalentDialog([meta, username]));
  }

  /**
   * Removes Talent with talentName from list of user's saved talents.
   * @param talentName Talent name to be removed
   */
  removeTalent(talentName: string) {
    return this.store.dispatch(new UserActions.RemoveTalent(talentName));
  }

  /**
   * Iff token exists in local storage, validate and log user in iff is still valid.
   */
  validateUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(new UserActions.GetUser(token));
    }
  }

  /**
   * Log user in iff user information is valid.
   * @param user User information
   */
  loginUser(user: UserForm) {
    this.store.dispatch(new UserActions.Userlogin(user));
  }

  /**
   * Log current user out.
   */
  logoutUser() {
    this.store.dispatch(new UserActions.UserLogout());
  }
}
