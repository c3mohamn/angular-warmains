import {
  catchError,
  filter,
  delay,
  map,
  mergeMap,
  switchMap,
  take,
  debounceTime
} from 'rxjs/operators';
import { of, pipe, Scheduler, Observable } from 'rxjs';

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { UserService } from '../../api/services/user.service';
import * as userActions from './user.actions';
import { Router } from '@angular/router';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class UserEffects {
  // @Effect()
  // update$: Observable<Action> = this.actions$.pipe(
  //   ofType(userActions.USER_GET_ME),
  //   switchMap(action => {
  //     // console.log('get user me');
  //     return this.userService
  //       .getMe()
  //       .map(data => {
  //         // console.log(`me`, data);
  //         return new userActions.GetUserMeSuccess(data);
  //       })
  //       .catchError(error => {
  //         return Observable.of(new userActions.UserError(error));
  //       });
  //   })
  // );

  // @Effect()
  // logout$: Observable<Action> = this.actions$.pipe(
  //   ofType(userActions.USER_LOGOUT),
  //   switchMap(action => {
  //     this.router.navigate(['/login']);
  //     return Observable.of();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
