import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
  TalentCalculatorActions,
  TalentCalculatorActionTypes
} from './talent-calculator.actions';
import { TalentCalculatorService } from './helpers/talent-calculator.service';
import { TalentService } from '../../api/services/talent.service';

@Injectable()
export class TalentCalculatorEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.LoadTalents>(
      TalentCalculatorActionTypes.LOAD_TALENTS
    )
    .pipe(
      // get class id
      map(action => action.payload),
      concatMap(payload => {
        const classId = payload[0],
          talentUrlParam = payload[1],
          glyphUrlParam = payload[2];
        // get raw details from api
        return this.talentService.getTalentDetails(classId).pipe(
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
            this.talentCalculatorService.getTalentStateFromUrl(
              talents,
              classId,
              talentUrlParam,
              glyphUrlParam
            )
          ),
          map(
            tooltips => new TalentCalculatorActions.LoadTalentsSuccess(tooltips)
          ),
          catchError(error =>
            of(new TalentCalculatorActions.TalentError(error))
          )
        );
      })
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
          return new TalentCalculatorActions.AddTalentPointSuccess([
            talent,
            newMeta
          ]);
        } else {
          return new TalentCalculatorActions.TalentError(
            `Cannot add point to ${talent.name}.`
          );
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
          return new TalentCalculatorActions.RemoveTalentPointSuccess([
            talent,
            newMeta
          ]);
        } else {
          return new TalentCalculatorActions.TalentError(
            `Cannot remove point from ${talent.name}.`
          );
        }
      })
    );

  @Effect()
  addGlyph$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.AddGlyph>(
      TalentCalculatorActionTypes.ADD_GLYPH
    )
    .pipe(
      map(action => action.payload),
      map(payload => {
        const glyph = payload[0],
          index = payload[1];
        if (this.talentCalculatorService.canAddGlyph(glyph, index)) {
          const newGlyphs = this.talentCalculatorService.addGlyph(glyph, index);
          return new TalentCalculatorActions.AddGlyphSuccess(newGlyphs);
        } else {
          return new TalentCalculatorActions.TalentError(
            `Cannot add glyph ${glyph.name}.`
          );
        }
      })
    );

  @Effect()
  removeGlyph$: Observable<Action> = this.actions$
    .ofType<TalentCalculatorActions.RemoveGlyph>(
      TalentCalculatorActionTypes.REMOVE_GLPYH
    )
    .pipe(
      map(action => action.payload),
      map(index => {
        const newGlyphs = this.talentCalculatorService.removeGlyph(index);
        return new TalentCalculatorActions.RemoveGlyphSuccess(newGlyphs);
      })
    );

  constructor(
    private actions$: Actions,
    private talentService: TalentService,
    private talentCalculatorService: TalentCalculatorService
  ) {}
}
