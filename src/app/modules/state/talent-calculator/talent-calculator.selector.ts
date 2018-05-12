import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TalentCalculatorState } from './talent-calculator.reducer';

const getTalentCalculatorState = createFeatureSelector<TalentCalculatorState>(
  'talentCalculator'
);

export namespace TalentCalculatorQuery {
  export const getMetaInfo = createSelector(
    getTalentCalculatorState,
    state => state.meta
  );
}
