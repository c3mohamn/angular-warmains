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

  loadTalents(classId: number) {
    return this.store.dispatch(new TalentCalculatorActions.GetTalents(classId));
  }

  addTalentPoint(talent: Talent) {
    return this.store.dispatch(
      new TalentCalculatorActions.AddTalentPoint(talent)
    );
  }

  removeTalentPoint(talent: Talent) {
    return this.store.dispatch(
      new TalentCalculatorActions.RemoveTalentPoint(talent)
    );
  }

  getTalentMetaInfo(): Observable<TalentMetaInfo> {
    return this.store.select(TalentCalculatorQuery.getMetaInfo);
  }

  getTalents(): Observable<Talent[]> {
    return this.store.select(TalentCalculatorQuery.getTalents);
  }
}
