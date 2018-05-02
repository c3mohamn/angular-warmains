import { Action } from 'redux';
import * as TalentActions from './talent.actions';
import { createSelector } from 'reselect';
import { TalentCalculator, Talent } from '../../components/body/pages/talent-calculator/models/talents.model';

export interface TalentCalculatorState extends TalentCalculator {
  talents: Talent[];
  totalPoints: number;
  treeRows: number[][];
  lastActiveRow: number[];
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
        totalPoints: calculator.totalPoints,
        lastActiveRow: calculator.lastActiveRow,
        treeRows: calculator.treeRows,
        preview: calculator.preview,
        talents: calculator.talents
      };

    case TalentActions.ADD_TALENT_POINT:
      let talentId: number = (<TalentActions.AddTalentPointAction>action).talentId;
        console.log(`Adding 1 points to talent ${talentId}.`);
        let tree = state.talents[talentId].tree;
        state.preview[tree]++;
        state.talents[talentId].curRank++;
        state.treeRows[tree][state.talents[talentId].row]++;
        state.totalPoints++;
        state.lastActiveRow[tree] =
          state.talents[talentId].row > state.lastActiveRow[tree] ? state.talents[talentId].row : state.lastActiveRow[tree];

      return state;

    case TalentActions.REMOVE_TALENT_POINT:
      talentId = (<TalentActions.RemoveTalentPointAction>action).talentId;
        console.log(`Removing 1 points from talent ${talentId}.`);
        tree = state.talents[talentId].tree;
        state.preview[tree]--;
        state.talents[talentId].curRank--;
        state.treeRows[tree][state.talents[talentId].row]--;
        state.totalPoints--;
        if (state.talents[talentId].row === state.lastActiveRow[tree] && state.treeRows[tree][state.talents[talentId].row] === 0) {
          state.lastActiveRow[tree]--;
      }

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
