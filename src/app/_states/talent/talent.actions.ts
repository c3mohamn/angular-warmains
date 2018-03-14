import { Action, ActionCreator } from 'redux';
import { TalentCalculatorState } from './talent.reducer';
import { Talent } from '../../body/talent-calculator/_models/talents.model';


export const LOAD_TALENT_DETAILS = 'Talents Details loaded';
export const ADD_TALENT_POINT = 'Added a talent point to [talent]';
export const REMOVE_TALENT_POINT = 'Removed a talent point from [talent]';
export const RESET_TALENT_POINTS = 'Reset talent points';

export interface LoadTalentDetailsAction extends Action {
  calculator: TalentCalculatorState;
}

export interface AddTalentPointAction extends Action {
  talent: Talent;
}

export interface RemoveTalentPointAction extends Action {
  talent: Talent;
}

export interface ResetTalentPointsAction extends Action {
  talents: Talent[];
}

export const loadTalentDetails: ActionCreator<LoadTalentDetailsAction> =
  (calculator) => ({
    type: LOAD_TALENT_DETAILS,
    calculator: calculator
  });

export const addTalentPoint: ActionCreator<AddTalentPointAction> =
  (talent) => ({
    type: ADD_TALENT_POINT,
    talent: talent
  });

export const removeTalentPoint: ActionCreator<RemoveTalentPointAction> =
  (talent) => ({
    type: REMOVE_TALENT_POINT,
    talent: talent
  });

export const resetTalentPoints: ActionCreator<ResetTalentPointsAction> =
  (talents) => ({
    type: RESET_TALENT_POINTS,
    talents: talents
  });
