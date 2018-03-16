import { Action } from 'redux';
import { TalentCalculator, Talent } from '../../body/talent-calculator/_models/talents.model';
import * as TalentActions from './talent.actions';
import { createSelector } from 'reselect';

export interface TalentCalculatorState extends TalentCalculator {
  talents: Talent[];
  totalPoints: number;
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
        preview: calculator.preview,
        talents: calculator.talents
      };

    case TalentActions.ADD_TALENT_POINT:
      let talentId: number = (<TalentActions.AddTalentPointAction>action).talentId;
      if (canAddPoint(state, talentId)) {
        console.log(`Adding 1 points to talent ${talentId}.`);
        state.preview[state.talents[talentId].tree]++;
        state.talents[talentId].curRank++;
        state.totalPoints++;
      }

      return state;

    case TalentActions.REMOVE_TALENT_POINT:
      talentId = (<TalentActions.RemoveTalentPointAction>action).talentId;
      if (canRemovePoint(state, talentId)) {
        console.log(`Removing 1 points from talent ${talentId}.`);
        state.preview[state.talents[talentId].tree]--;
        state.talents[talentId].curRank--;
        state.totalPoints--;
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

// Helper functions

function canAddPoint(state: TalentCalculatorState, talentId: number) {
  const talent = state.talents[talentId];
  let canAdd = true;

  if (talent.curRank === talent.maxRank) {
    console.log(`${talent.name} is already maxed.`);
    canAdd = false;
  } else if (state.totalPoints === 71) {
    console.log('No points left to use.');
    canAdd = false;
  } else if (state.preview[talent.tree] < 5 * talent.row) {
    console.log(`This talent requires ${talent.row * 5} points`);
    canAdd = false;
  } else if (talent.requires && state.talents[talent.requires].curRank !== state.talents[talent.requires].maxRank) {
    console.log(`This talent requires max points in talent ${state.talents[talent.requires].name}`);
    canAdd = false;
  }

  return canAdd;
}

function canRemovePoint(state: TalentCalculatorState, talentId: number) {
  const talent = state.talents[talentId];
  let canRemove = true;
  const lastActiveRow = Math.floor((state.preview[talent.tree]) / 5);

  console.log(lastActiveRow);

  if (talent.curRank === 0) {
    console.log(`${talent.name} has no talents points to remove.`);
    canRemove = false;
  } else if (talent.allows) {
    console.log('allows');
    talent.allows.forEach(id => {
      if (state.talents[id].curRank > 0) {
        console.log(`This talent is a prequisite for ${state.talents[id].name}.`);
        canRemove = false;
      }
    });
  }
  // TODO:
  // else if (talent.row !== lastActiveRow) {
  //   // do something
  //   let i = 0;
  //   while (lastActiveRow - i > talent.row) {
  //     if (sumRows() <= (lastActiveRow - i) * 5) {
  //       console.log(`This talent is a required for row ${i}`);
  //       return false;
  //     }
  //     i++;
  //   }
  // }

  function sumRows() {
    return 5;
  }

  return canRemove;
}

export const getTalentCalculatorState = (state): TalentCalculatorState => state.calculator;

export const getCurrentTalentCalculatorState = createSelector(
  getTalentCalculatorState,
  ( state: TalentCalculatorState ) => state );
