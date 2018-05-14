import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  concatMap,
  mergeMap
} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
  TalentCalculatorActions,
  TalentCalculatorActionTypes
} from './talent-calculator.actions';
import { TalentCalculatorService } from './talent-calculator.service';
import { TalentService } from '../../api/services/talent.service';

@Injectable()
export class TalentCalculatorEffects {
  @Effect()
  get$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.LoadTalents>(
      TalentCalculatorActionTypes.LOAD_TALENTS
    )
    .pipe(
      // get class id
      map(action => action.payload),
      concatMap(classId =>
        // get raw details from api
        this.talentService.getTalentDetails(classId).pipe(
          map(rawDetails =>
            // transform details to proper Talent[]
            this.talentCalculatorService.getTalentDetails(rawDetails)
          ),
          concatMap(details =>
            // get tooltips from api
            this.talentService.getTalentTooltips(classId).pipe(
              map(tooltips =>
                // add tooltips to Talent[]
                this.talentCalculatorService.getTalentTooltips(
                  details,
                  tooltips
                )
              )
            )
          ),
          map(talents =>
            // get talent calculator state
            this.talentCalculatorService.getTalentMetaInfo(talents, classId)
          ),
          map(
            tooltips => new TalentCalculatorActions.LoadTalentsSuccess(tooltips)
          ),
          catchError(error =>
            of(new TalentCalculatorActions.TalentError(error))
          )
        )
      )
    );

  @Effect()
  addPoint$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.AddTalentPoint>(
      TalentCalculatorActionTypes.ADD_TALENT_POINT
    )
    .pipe(
      map(action => action.payload),
      map(talent => {
        if (this.talentCalculatorService.canAddPoint(talent)) {
          const newMeta = this.talentCalculatorService.getUpdatedTalentMetaInfo(
            talent,
            1
          );
          return new TalentCalculatorActions.AddTalentPointSuccess([talent, newMeta]);
        } else {
          return new TalentCalculatorActions.TalentError('Cannot add point.');
        }
      })
    );

  @Effect()
  removePoint$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.RemoveTalentPoint>(
      TalentCalculatorActionTypes.REMOVE_TALENT_POINT
    )
    .pipe(
      map(action => action.payload),
      map(talent => {
        if (this.talentCalculatorService.canRemovePoint(talent)) {
          const newMeta = this.talentCalculatorService.getUpdatedTalentMetaInfo(
            talent,
            -1
          );
          return new TalentCalculatorActions.RemoveTalentPointSuccess([talent, newMeta]);
        } else {
          return new TalentCalculatorActions.TalentError(
            'Cannot remove point.'
          );
        }
      })
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private talentService: TalentService,
    private talentCalculatorService: TalentCalculatorService
  ) {}
}
