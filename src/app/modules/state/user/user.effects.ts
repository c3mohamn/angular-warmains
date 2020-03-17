import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { UserService } from '../../auth/services/user.service';
import { UserActionTypes, UserActions } from './user.actions';
import { TalentService } from '../../talent-calculator/services/talent-api.service';
// tslint:disable-next-line:max-line-length
import { SaveTalentDialogComponent } from '../../talent-calculator/components/save-talent-dialog/save-talent-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UserEffects {
  @Effect()
  validate$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.GetUser>(UserActionTypes.GET_USER),
    map(action => action.payload),
    switchMap(token =>
      this.userService.validateToken(token).pipe(
        mergeMap(data => {
          localStorage.setItem('token', data.token);
          return [new UserActions.GetUserSuccess(data), new UserActions.GetUserTalents(data.username)];
        }),
        catchError(error => {
          localStorage.removeItem('token');
          return of(new UserActions.UserError(error));
        })
      )
    )
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.Userlogin>(UserActionTypes.USER_LOGIN),
    map(action => action.payload),
    switchMap(user =>
      this.userService.loginUser(user).pipe(
        mergeMap(data => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['home']);
          return [new UserActions.GetUserSuccess(data), new UserActions.GetUserTalents(data.username)];
        }),
        catchError(error => of(new UserActions.UserError(error)))
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
      return of(action);
    })
  );

  @Effect()
  getTalents$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.GetUserTalents>(UserActionTypes.GET_USER_TALENTS),
    map(action => action.payload),
    concatMap(username =>
      this.talentService.getTalents(username).pipe(
        map(talents => new UserActions.GetUserTalentsSuccesss(talents)),
        catchError(error => of(new UserActions.UserError(error)))
      )
    )
  );

  @Effect()
  openSaveTalentDialog$ = this.actions$.pipe(
    ofType<UserActions.OpenSaveTalentDialog>(UserActionTypes.OPEN_SAVE_TALENT_DIALOG),
    map(action => action.payload),
    exhaustMap(payload => {
      const meta = payload[0],
        username = payload[1];
      const dialogRef = this.dialog.open(SaveTalentDialogComponent, {
        width: '80%',
        minWidth: '300px',
        maxWidth: '1000px',
        maxHeight: '600px',
        data: { meta: meta, username: username }
      });
      return dialogRef.afterClosed();
    }),
    map(result => {
      console.log(result);
      if (result) {
        return new UserActions.SaveTalent(result);
      }

      return new UserActions.DialogClosed();
    })
  );

  @Effect()
  saveTalent$ = this.actions$.pipe(
    ofType<UserActions.SaveTalent>(UserActionTypes.SAVE_TALENT),
    map(action => action.payload),
    map(newTalent =>
      this.talentService.saveTalent(newTalent).pipe(
        map(talent => new UserActions.SaveTalentSuccess(talent)),
        catchError(error => of(new UserActions.SaveTalentError(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private talentService: TalentService,
    public dialog: MatDialog
  ) {}
}
