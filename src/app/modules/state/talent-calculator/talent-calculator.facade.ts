import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { TalentCalculatorActions } from './talent-calculator.actions';
import { TalentCalculatorQuery } from './talent-calculator.selector';
import {
  TalentCalculatorState,
  TalentMetaInfo
} from './talent-calculator.reducer';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';

@Injectable()
export class TalentCalculatorFacade {
  constructor(
    private actions$: Actions,
    private store: Store<TalentCalculatorState>
  ) {}

  /**
   * Loads the talents and glyphs for class, filling talent points and glyphs according to queryParma.
   * @param classId current class Id
   * @param talentsParam current talents queryParam
   * @param glyphsParam current glyphs queryParam
   */
  loadTalents(
    classId: number,
    talentsParam: string = '',
    glyphsParam: string = ''
  ) {
    return this.store.dispatch(
      new TalentCalculatorActions.LoadTalents([
        classId,
        talentsParam,
        glyphsParam
      ])
    );
  }

  /**
   * Adds a talent point to Talent.
   * @param talent Talent
   */
  addTalentPoint(talent: Talent) {
    return this.store.dispatch(
      new TalentCalculatorActions.AddTalentPoint(talent)
    );
  }

  /**
   * Removes a talent point from Talent.
   * @param talent Talent
   */
  removeTalentPoint(talent: Talent) {
    return this.store.dispatch(
      new TalentCalculatorActions.RemoveTalentPoint(talent)
    );
  }

  /**
   * Returns current Talent Meta Information.
   */
  getTalentMetaInfo(): Observable<TalentMetaInfo> {
    return this.store.select(TalentCalculatorQuery.getMetaInfo);
  }

  /**
   * Returns list of current Talents.
   */
  getTalents(): Observable<Talent[]> {
    return this.store.select(TalentCalculatorQuery.getTalents);
  }
}
