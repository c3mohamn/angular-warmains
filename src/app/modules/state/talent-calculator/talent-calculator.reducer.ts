import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
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

// export interface TalentCalculatorState extends EntityState<Talent> {}

// const talentAdapter: EntityAdapter<Talent> = createEntityAdapter<Talent>();

// export const initialState: TalentCalculatorState = talentAdapter.getInitialState();

export function talentCalculatorReducer(
  state = initialState,
  action: TalentCalculatorActionsUnion
): TalentCalculatorState {
  switch (action.type) {
    case TalentCalculatorActionTypes.LOAD_TALENTS_SUCCESS:
      const newState = Object.assign({}, state, action.payload, {});
      return newState;

    case TalentCalculatorActionTypes.ADD_TALENT_POINT_SUCCESS:
      // return talentAdapter.updateOne(
      //   {
      //     id: action.payload.id,
      //     changes: { curRank: action.payload.curRank + 1 }
      //   },
      //   state
      // );

      return Object.assign({}, state, state.talents, action.payload, {});

    case TalentCalculatorActionTypes.REMOVE_TALENT_POINT_SUCCESS:
      return Object.assign({}, state, action.payload, {});

    default:
      return state;
  }
}
