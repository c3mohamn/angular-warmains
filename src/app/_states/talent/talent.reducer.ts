import { Action } from 'redux';
import { TalentCalculator, Talent } from '../../body/talent-calculator/_models/talents.model';
import * as TalentActions from './talent.actions';
import { createSelector } from 'reselect';

export interface TalentCalculatorState extends TalentCalculator {
  talents: Talent[];
}

export const TalentReducer =
  function(state: TalentCalculatorState = null, action: Action): TalentCalculatorState {
  switch (action.type) {
    case TalentActions.LOAD_TALENT_DETAILS:
      const calculator: TalentCalculatorState = (<TalentActions.LoadTalentDetailsAction>action).calculator;
      return {
        name: calculator.name,
        classId: calculator.classId,
        description: calculator.description,
        glyphUrl: calculator.glyphUrl,
        talentUrl: calculator.talentUrl,
        spec: calculator.spec,
        preview: calculator.preview,
        talents: calculator.talents
      };
    case TalentActions.ADD_TALENT_POINT:
      let talent: Talent = (<TalentActions.AddTalentPointAction>action).talent;
      state.talents[talent.id] = talent;
      return state;
    case TalentActions.REMOVE_TALENT_POINT:
      talent = (<TalentActions.RemoveTalentPointAction>action).talent;
      state.talents[talent.id] = talent;
      return state;
    case TalentActions.RESET_TALENT_POINTS:
      const talents: Talent[] = (<TalentActions.ResetTalentPointsAction>action).talents;
      state.talents = talents;
      return state;
    default:
      return state;
  }
};

export const getTalentCalculatorState = (state): TalentCalculatorState => state.calculator;

export const getCurrentTalentCalculatorState = createSelector(
  getTalentCalculatorState,
  ( state: TalentCalculatorState ) => state );
