import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
  TalentCalculatorActions,
  TalentCalculatorActionTypes
} from './talent-calculator.actions';
import { TalentService } from '../../api/services/talent.service';

@Injectable()
export class TalentCalculatorEffects {
  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.GetTalents>(
      TalentCalculatorActionTypes.GET_TALENTS
    )
    .pipe(
      map(action => action.payload),
      concatMap(classId => {
        return this.talentService.getTalentDetails(classId).pipe(
          map(data => {
            return new TalentCalculatorActions.LoadTalents(data);
          }),
          catchError(error => {
            return of(new TalentCalculatorActions.TalentError(error));
          })
        );
      })
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private talentService: TalentService
  ) {}
}
