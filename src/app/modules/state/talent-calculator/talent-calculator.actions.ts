import { Action } from '@ngrx/store';
import { Talent, Glyph } from '../../talent-calculator/models/talents.model';
import { TalentCalculatorState, TalentMetaInfo } from './talent-calculator.reducer';

export enum TalentCalculatorActionTypes {
  LOAD_TALENTS = '[TalentCalculator] get talents',
  LOAD_TALENTS_SUCCESS = '[TalentCalculator] loaded talents',
  ADD_TALENT_POINT = '[TalentCalculator] adding a talent point to [Talent]',
  ADD_TALENT_POINT_SUCCESS = '[TalentCalculator] talent point added to [Talent]',
  REMOVE_TALENT_POINT = '[TalentCalculator] removing a talent point from [Talent]',
  REMOVE_TALENT_POINT_SUCCESS = '[TalentCalculator] talent point removed from [Talent]',
  ADD_GLYPH = '[TalentCalculator] adding glyph',
  ADD_GLYPH_SUCCESS = '[TalentCalculator] glyph added',
  REMOVE_GLPYH = '[TalentCalculator] removing glyph',
  REMOVE_GLYPH_SUCCESS = '[TalentCalculator] glyph removed',
  RESET_TALENT_POINTS = '[TalentCalculator] reseting talents',
  RESET_TALENT_POINTS_SUCCESS = '[TalentCalculator] reset talents',
  TALENT_ERROR = '[TalentCalculator] error'
}

export namespace TalentCalculatorActions {
  export class LoadTalents implements Action {
    readonly type = TalentCalculatorActionTypes.LOAD_TALENTS;

    constructor(public payload: [number, string, string]) {}
  }

  export class LoadTalentsSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.LOAD_TALENTS_SUCCESS;

    constructor(public payload: TalentCalculatorState) {}
  }

  export class AddTalentPoint implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_TALENT_POINT;

    constructor(public payload: Talent) {}
  }

  export class AddTalentPointSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_TALENT_POINT_SUCCESS;

    constructor(public payload: [Talent, TalentMetaInfo]) {}
  }

  export class RemoveTalentPoint implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_TALENT_POINT;

    constructor(public payload: Talent) {}
  }

  export class RemoveTalentPointSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_TALENT_POINT_SUCCESS;

    constructor(public payload: [Talent, TalentMetaInfo]) {}
  }

  export class AddGlyph implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_GLYPH;

    constructor(public payload: [Glyph, number]) {}
  }

  export class AddGlyphSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.ADD_GLYPH_SUCCESS;

    constructor(public payload: [Glyph[], TalentMetaInfo]) {}
  }

  export class RemoveGlyph implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_GLPYH;

    constructor(public payload: number) {}
  }

  export class RemoveGlyphSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.REMOVE_GLYPH_SUCCESS;

    constructor(public payload: [Glyph[], TalentMetaInfo]) {}
  }

  export class ResetTalentPoints implements Action {
    readonly type = TalentCalculatorActionTypes.RESET_TALENT_POINTS;

    constructor(public payload: number) {}
  }

  export class ResetTalentPointsSuccess implements Action {
    readonly type = TalentCalculatorActionTypes.RESET_TALENT_POINTS_SUCCESS;

    constructor(public payload: TalentCalculatorState) {}
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
  | TalentCalculatorActions.AddGlyphSuccess
  | TalentCalculatorActions.RemoveGlyphSuccess
  | TalentCalculatorActions.ResetTalentPointsSuccess
  | TalentCalculatorActions.TalentError;
