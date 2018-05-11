import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  delay,
  map,
  mergeMap,
  switchMap,
  take
} from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { UserService } from '../../api/services/user.service';
import { UserActionTypes, UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  // @Effect()
  // update$: Observable<Action> = this.actions$.pipe(
  //   ofType(UserActionTypes.USER_GET_ME),
  //   switchMap(action => {
  //     // console.log('get user me');
  //     return this.userService
  //       .getMe()
  //       .map(data => {
  //         // console.log(`me`, data);
  //         return new UserActions.GetUserMeSuccess(data);
  //       })
  //       .catchError(error => {
  //         return Observable.of(new UserActions.UserError(error));
  //       });
  //   })
  // );

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(UserActionTypes.GET_USER)
    .pipe(
      switchMap(action => {
        console.log('USER_GET_ME');
        const token = localStorage.getItem('token');

        if (token) {
          this.userService.validateToken(token).pipe(
            map(data => {
              console.log(`validated?: ${data}`);
              return of(new UserActions.GetUserSuccess(data));
            }),
            catchError(error => {
              return of(new UserActions.UserError(error));
            })
          );
        } else {
          return of(new UserActions.UserLogout());
        }
      })
    );

  // @Effect()
  // logout$: Observable<Action> = this.actions$.pipe(
  //   ofType(UserActionTypes.USER_LOGOUT),
  //   switchMap(action => {
  //     this.router.navigate(['/login']);
  //     return Observable.of();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService
  ) {}
}
