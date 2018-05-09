import { Action } from 'redux';
import * as TalentActions from './talent.actions';
import { createSelector } from 'reselect';
import {
  Talent
} from '../../components/body/pages/talent-calculator/models/talents.model';
import { TalentCalculatorComponent } from '../../components/body/pages/talent-calculator/talent-calculator.component';

export interface TalentCalculatorState {
  meta: TalentMetaInfo;
  talents: Talent[];
  treeRows: number[][];
  lastActiveRow: number[];
  preview: number[];
}

export interface TalentMetaInfo {
  talentUrlParam: string;
  glyphUrlParam: string;
  classId: number;
  spec: string;
  totalPoints: number;
}

const initialState: TalentCalculatorState = {
  meta: {
    talentUrlParam: '',
    glyphUrlParam: '',
    classId: null,
    spec: '',
    totalPoints: 0
  },
  talents: [],
  treeRows: [[]],
  lastActiveRow: [0, 0, 0],
  preview: [0, 0, 0]
};

export const TalentReducer = function(
  state: TalentCalculatorState = initialState,
  action: Action
): TalentCalculatorState {
  switch (action.type) {
    case TalentActions.LOAD_TALENT_DETAILS:
      const calculator: TalentCalculatorState = (<TalentActions.LoadTalentDetailsAction>action)
        .calculator;

      return { ...state, ...calculator };

    case TalentActions.ADD_TALENT_POINT:
      let talentId: number = (<TalentActions.AddTalentPointAction>action)
        .talentId;
      console.log(`Adding 1 points to talent ${talentId}.`);
      let tree = state.talents[talentId].tree;
      state.preview[tree]++;
      state.talents[talentId].curRank++;
      state.treeRows[tree][state.talents[talentId].row]++;
      state.meta.totalPoints++;
      state.lastActiveRow[tree] =
        state.talents[talentId].row > state.lastActiveRow[tree]
          ? state.talents[talentId].row
          : state.lastActiveRow[tree];

      return state;

    case TalentActions.REMOVE_TALENT_POINT:
      talentId = (<TalentActions.RemoveTalentPointAction>action).talentId;
      console.log(`Removing 1 points from talent ${talentId}.`);
      tree = state.talents[talentId].tree;
      state.preview[tree]--;
      state.talents[talentId].curRank--;
      state.treeRows[tree][state.talents[talentId].row]--;
      state.meta.totalPoints--;
      if (
        state.talents[talentId].row === state.lastActiveRow[tree] &&
        state.treeRows[tree][state.talents[talentId].row] === 0
      ) {
        state.lastActiveRow[tree]--;
      }

      return state;

    case TalentActions.RESET_TALENT_POINTS:
      const talents: Talent[] = (<TalentActions.ResetTalentPointsAction>action)
        .talents;
      state.talents = talents;
      return state;

    default:
      return state;
  }
};

export const getTalentCalculatorState = (state): TalentCalculatorState =>
  state.talentCalculator;

export namespace TalentSelector {
  export const getCurrentTalentCalculatorState = createSelector(
    getTalentCalculatorState,
    (state: TalentCalculatorState) => state
  );

  export const getTalentMeta = createSelector(
    getTalentCalculatorState,
    (state: TalentCalculatorState) => state.meta
  );

  export const getTalentPreview = createSelector(
    getTalentCalculatorState,
    (state: TalentCalculatorState) => state.preview
  );

  export const getAllTalents = createSelector(
    getTalentCalculatorState,
    (state: TalentCalculatorState) => state.talents
  );

  export const getLastActiveRow = createSelector(
    getTalentCalculatorState,
    (state: TalentCalculatorState) => state.lastActiveRow
  );

  export const getTreeRows = createSelector(
    getTalentCalculatorState,
    (state: TalentCalculatorState) => state.treeRows
  );
}
