import {
  Talent,
  Glyph
} from '../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorActionsUnion,
  TalentCalculatorActionTypes
} from './talent-calculator.actions';

export interface TalentCalculatorState {
  meta: TalentMetaInfo;
  talents: Talent[];
  glyphs: Glyph[];
}

export interface TalentMetaInfo {
  talentUrlParam: string;
  glyphUrlParam: string;
  talentPointsArray: number[];
  glyphsArray: number[];
  classId: number;
  spec: string;
  totalPoints: number;
  treeRows: number[][];
  lastActiveRow: number[];
  preview: number[];
}

const initialState: TalentCalculatorState = {
  meta: {
    talentUrlParam: '',
    glyphUrlParam: '',
    talentPointsArray: [],
    glyphsArray: [],
    classId: null,
    spec: '',
    totalPoints: 0,
    preview: [0, 0, 0],
    treeRows: [[]],
    lastActiveRow: [0, 0, 0]
  },
  talents: [],
  glyphs: []
};

export function talentCalculatorReducer(
  state = initialState,
  action: TalentCalculatorActionsUnion
): TalentCalculatorState {
  switch (action.type) {
    case TalentCalculatorActionTypes.LOAD_TALENTS_SUCCESS:
      return Object.assign({}, state, action.payload);

    case TalentCalculatorActionTypes.ADD_TALENT_POINT_SUCCESS:
      return Object.assign(
        {},
        state,
        { meta: action.payload[1] },
        action.payload[0].curRank++
      );

    case TalentCalculatorActionTypes.REMOVE_TALENT_POINT_SUCCESS:
      return Object.assign(
        {},
        state,
        { meta: action.payload[1] },
        action.payload[0].curRank--
      );

    case TalentCalculatorActionTypes.ADD_GLYPH_SUCCESS:
      return Object.assign({}, state, {
        glyphs: action.payload[0],
        meta: action.payload[1]
      });

    case TalentCalculatorActionTypes.REMOVE_GLYPH_SUCCESS:
      return Object.assign({}, state, {
        glyphs: action.payload[0],
        meta: action.payload[1]
      });

    case TalentCalculatorActionTypes.RESET_TALENT_POINTS_SUCCESS:
      return Object.assign({}, state, action.payload);

    case TalentCalculatorActionTypes.TALENT_ERROR:
      return state;

    default:
      return state;
  }
}
