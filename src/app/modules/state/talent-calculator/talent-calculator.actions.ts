import { Action } from '@ngrx/store';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';
import { TalentMetaInfo } from '../../../states/talent/talent.reducer';

export enum TalentCalculatorActionTypes {
  GET_TALENTS = '[TalentCalculator] get talents',
  LOAD_TALENTS = '[TalentCalculator] load talents',
  ADD_TALENT_POINT = '[TalentCalculator] Added a talent point to [Talent]',
  REMOVE_TALENT_POINT = '[TalentCalculator] Removed a talent point from [Talent]',
  RESET_TALENT_POINTS = '[TalentCalculator] reset talents',
  UPDATE_TALENT_META = '[TalentCalculator] meta updated.',
  TALENT_ERROR = '[TalentCalculator] error'
}

export namespace TalentCalculatorActions {
  export class GetTalents implements Action {
    readonly type = TalentCalculatorActionTypes.GET_TALENTS;

    constructor(public payload: number) {}
  }

  export class LoadTalents implements Action {
    readonly type = TalentCalculatorActionTypes.LOAD_TALENTS;

    constructor(public payload: Talent[]) {}
  }

  export class UpdateTalentMetaInfo implements Action {
    readonly type = TalentCalculatorActionTypes.UPDATE_TALENT_META;

    constructor(public payload: TalentMetaInfo) {}
  }

  export class AddTalentPoint implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_TALENT_POINT;

    constructor(public payload: Talent) {}
  }

  export class RemoveTalentPoint implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_TALENT_POINT;

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
  | TalentCalculatorActions.LoadTalents
  | TalentCalculatorActions.AddTalentPoint
  | TalentCalculatorActions.RemoveTalentPoint
  | TalentCalculatorActions.ResetTalentPoints;
