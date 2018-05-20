import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { UserService } from '../../api/services/user.service';
import { UserActionTypes, UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  validate$: Observable<Action> = this.actions$
    .ofType<UserActions.GetUser>(UserActionTypes.GET_USER)
    .pipe(
      map(action => action.payload),
      switchMap(token =>
        this.userService.validateToken(token).pipe(
          map(data => {
            localStorage.setItem('token', data.token);
            return new UserActions.GetUserSuccess(data);
          }),
          catchError(error => {
            localStorage.removeItem('token');
            return of(new UserActions.UserError(error));
          })
        )
      )
    );

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<UserActions.Userlogin>(UserActionTypes.USER_LOGIN)
    .pipe(
      map(action => action.payload),
      switchMap(user =>
        this.userService.loginUser(user).pipe(
          map(data => {
            localStorage.setItem('token', data.token);
            this.router.navigate(['home']);
            return new UserActions.GetUserSuccess(data);
          }),
          catchError(error => {
            return of(new UserActions.UserError(error));
          })
        )
      )
    );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.USER_LOGOUT),
    switchMap(action => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
      // this.userService.removeUserToken()
      return of();
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService
  ) {}
}
