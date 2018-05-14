import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';
import {
  TalentCalculatorActionsUnion,
  TalentCalculatorActionTypes
} from './talent-calculator.actions';

export interface TalentCalculatorState {
  meta: TalentMetaInfo;
  talents: Talent[];
}

export interface TalentMetaInfo {
  talentUrlParam: string;
  glyphUrlParam: string;
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
    classId: null,
    spec: '',
    totalPoints: 0,
    preview: [0, 0, 0],
    treeRows: [[]],
    lastActiveRow: [0, 0, 0]
  },
  talents: []
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

    case TalentCalculatorActionTypes.TALENT_ERROR:
      return state;

    default:
      return state;
  }
}
