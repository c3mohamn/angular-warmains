import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TalentCalculatorState } from './talent-calculator.reducer';

const getTalentCalculatorState = createFeatureSelector<TalentCalculatorState>(
  'talentCalculator'
);

export namespace TalentCalculatorQuery {
  export const getState = createSelector(
    getTalentCalculatorState,
    state => state
  );

  export const getMetaInfo = createSelector(
    getTalentCalculatorState,
    state => state.meta
  );

  export const getTalents = createSelector(
    getTalentCalculatorState,
    state => state.talents
  );
}
