import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  concat,
  concatMap,
  exhaustMap
} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { UserService } from '../../api/services/user.service';
import { UserActionTypes, UserActions } from './user.actions';
import { TalentService } from '../../api/services/talent.service';
// tslint:disable-next-line:max-line-length
import { SaveTalentDialogComponent } from '../../../components/body/pages/talent-calculator/components/save-talent-dialog/save-talent-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class UserEffects {
  @Effect()
  validate$: Observable<Action> = this.actions$
    .ofType<UserActions.GetUser>(UserActionTypes.GET_USER)
    .pipe(
      map(action => action.payload),
      switchMap(token =>
        this.userService.validateToken(token).pipe(
          mergeMap(data => {
            localStorage.setItem('token', data.token);
            return [
              new UserActions.GetUserSuccess(data),
              new UserActions.GetUserTalents(data.username)
            ];
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
          mergeMap(data => {
            localStorage.setItem('token', data.token);
            this.router.navigate(['home']);
            return [
              new UserActions.GetUserSuccess(data),
              new UserActions.GetUserTalents(data.username)
            ];
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

  @Effect()
  getTalents$: Observable<Action> = this.actions$
    .ofType<UserActions.GetUserTalents>(UserActionTypes.GET_USER_TALENTS)
    .pipe(
      map(action => action.payload),
      concatMap(username =>
        this.talentService.getTalents(username).pipe(
          map(talents => new UserActions.GetUserTalentsSuccesss(talents)),
          catchError(error => {
            return of(new UserActions.UserError(error));
          })
        )
      )
    );

  @Effect()
  openSaveTalentDialog$ = this.actions$.pipe(
    ofType<UserActions.OpenSaveTalentDialog>(
      UserActionTypes.OPEN_SAVE_TALENT_DIALOG
    ),
    exhaustMap(_ => {
      const dialogRef = this.dialog.open(SaveTalentDialogComponent);
      return dialogRef.afterClosed();
    }),
    map(result => {
      console.log(result);
      if (result) {
        return new UserActions.AddTalent(result);
      }

      return new UserActions.DialogClosed();
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private talentService: TalentService,
    public dialog: MatDialog
  ) {}
}
