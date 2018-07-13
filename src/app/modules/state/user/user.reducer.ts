import { User } from '../../../models/user.model';
import { UserActionTypes, UserActionsUnion } from './user.actions';
import { Talent } from '../../../models/talent.model';

export interface UserState extends User {
  talents: Talent[];
  error: string;
  success: string;
}

export const initialState: UserState = {
  id: null,
  username: null,
  email: '',
  role: 0,
  talents: [],
  token: '',
  error: '',
  success: ''
};

export function userReducer(
  state = initialState,
  action: UserActionsUnion
): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USER_SUCCESS:
      const newState = Object.assign({}, state, action.payload, {
        error: '',
        success: 'Successfully logged in.'
      });

      return newState;

    case UserActionTypes.USER_ERROR:
      return Object.assign({}, state, initialState, {
        error: action.payload.error
      });

    case UserActionTypes.USER_LOGOUT:
      return Object.assign({}, state, initialState, {});

    case UserActionTypes.GET_USER_TALENTS_SUCCESS:
      return Object.assign({}, state, { talents: action.payload });

    case UserActionTypes.ADD_TALENT:
      let newTalents = state.talents;
      newTalents.push(action.payload);

      return Object.assign({}, state, { talents: newTalents });

    case UserActionTypes.REMOVE_TALENT:
      newTalents = state.talents;
      newTalents = newTalents.filter(talent => talent.name !== action.payload);

      return Object.assign({}, state, { talents: newTalents });

    case UserActionTypes.DIALOG_CLOSED:
      return state;

    default:
      return state;
  }
}
