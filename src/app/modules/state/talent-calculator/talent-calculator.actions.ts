import { Action } from '@ngrx/store';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorState,
  TalentMetaInfo
} from './talent-calculator.reducer';

export enum TalentCalculatorActionTypes {
  LOAD_TALENTS = '[TalentCalculator] get talents',
  LOAD_TALENTS_SUCCESS = '[TalentCalculator] loaded talents',
  ADD_TALENT_POINT = '[TalentCalculator] adding a talent point to [Talent]',
  ADD_TALENT_POINT_SUCCESS = '[TalentCalculator] added a talent point to [Talent]',
  REMOVE_TALENT_POINT = '[TalentCalculator] removing a talent point from [Talent]',
  REMOVE_TALENT_POINT_SUCCESS = '[TalentCalculator] removed a talent point from [Talent]',
  RESET_TALENT_POINTS = '[TalentCalculator] reset talents',
  UPDATE_TALENT_META = '[TalentCalculator] meta updated.',
  TALENT_ERROR = '[TalentCalculator] error'
}

export namespace TalentCalculatorActions {
  export class LoadTalents implements Action {
    readonly type = TalentCalculatorActionTypes.LOAD_TALENTS;

    constructor(public payload: number) {}
  }

  export class LoadTalentsSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.LOAD_TALENTS_SUCCESS;

    constructor(public payload: TalentCalculatorState) {}
  }

  export class UpdateTalentMetaInfo implements Action {
    readonly type = TalentCalculatorActionTypes.UPDATE_TALENT_META;

    constructor(public payload: TalentMetaInfo) {}
  }

  export class AddTalentPoint implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_TALENT_POINT;

    constructor(public payload: Talent) {}
  }

  export class AddTalentPointSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_TALENT_POINT_SUCCESS;

    constructor(public payload: Talent) {}
  }

  export class RemoveTalentPoint implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_TALENT_POINT;

    constructor(public payload: Talent) {}
  }

  export class RemoveTalentPointSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_TALENT_POINT_SUCCESS;

    constructor(public payload: Talent) {}
  }

  export class ResetTalentPoints implements Action {
    readonly type = TalentCalculatorActionTypes.RESET_TALENT_POINTS;

    constructor(public payload: any) {}
  }

  export class TalentError implements Action {
    readonly type = TalentCalculatorActionTypes.TALENT_ERROR;

    constructor(public payload: any) {}
  }
}

export type TalentCalculatorActionsUnion =
  | TalentCalculatorActions.LoadTalentsSuccess
  | TalentCalculatorActions.AddTalentPointSuccess
  | TalentCalculatorActions.RemoveTalentPointSuccess
  | TalentCalculatorActions.ResetTalentPoints;
