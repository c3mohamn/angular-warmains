import { Action, ActionCreator } from 'redux';
import { TalentCalculatorState } from './talent.reducer';
import { Talent } from '../../body/talent-calculator/_models/talents.model';


export const LOAD_TALENT_DETAILS = 'Talents Details loaded';
export const ADD_TALENT_POINT = 'Added a talent point to [talentId]';
export const REMOVE_TALENT_POINT = 'Removed a talent point from [talentId]';
export const RESET_TALENT_POINTS = 'Reset talent points';

export interface LoadTalentDetailsAction extends Action {
  calculator: TalentCalculatorState;
}

export interface AddTalentPointAction extends Action {
  talentId: number;
}

export interface RemoveTalentPointAction extends Action {
  talentId: number;
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
  (talentId) => ({
    type: ADD_TALENT_POINT,
    talentId: talentId
  });

export const removeTalentPoint: ActionCreator<RemoveTalentPointAction> =
  (talentId) => ({
    type: REMOVE_TALENT_POINT,
    talentId: talentId
  });

export const resetTalentPoints: ActionCreator<ResetTalentPointsAction> =
  (talents) => ({
    type: RESET_TALENT_POINTS,
    talents: talents
  });
