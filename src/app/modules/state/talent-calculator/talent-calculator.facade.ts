import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { TalentCalculatorActions } from './talent-calculator.actions';
import { TalentCalculatorQuery } from './talent-calculator.selector';
import { TalentCalculatorState } from './talent-calculator.reducer';

@Injectable()
export class TalentCalculatorFacade {
  constructor(private actions$: Actions, private store: Store<TalentCalculatorState>) {}

  getTalents(classId: number) {
    return this.store.dispatch(new TalentCalculatorActions.GetTalents(classId));
  }
}
