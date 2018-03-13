import { Action, ActionCreator } from 'redux';
import { TalentCalculatorState } from './talent.reducer';


export const LOAD_TALENT_DETAILS = 'Talents Details loaded';

export interface LoadTalentDetailsAction extends Action {
  calculator: TalentCalculatorState;
}

export const loadTalentDetails: ActionCreator<LoadTalentDetailsAction> =
  (calculator) => ({
    type: LOAD_TALENT_DETAILS,
    calculator: calculator
  });
