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

export function userReducer(state = initialState, action: UserActionsUnion): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USER_SUCCESS:
      return { ...state, ...action.payload, error: '', success: 'Successfully logged in.' };

    case UserActionTypes.USER_ERROR:
      return { ...state, ...initialState, error: action.payload.error, success: '' };

    case UserActionTypes.USER_LOGOUT:
      return { ...state, ...initialState };

    case UserActionTypes.GET_USER_TALENTS_SUCCESS:
      return { ...state, talents: action.payload };

    case UserActionTypes.SAVE_TALENT_SUCCESS:
      return {
        ...state,
        talents: state.talents.concat(action.payload),
        error: '',
        success: `Successfully saved talent ${action.payload.name}`
      };

    case UserActionTypes.SAVE_TALENT_ERROR:
      return { ...state, error: action.payload.error, success: '' };

    case UserActionTypes.REMOVE_TALENT:
      return { ...state, talents: state.talents.filter(talent => talent.name !== action.payload) };

    case UserActionTypes.DIALOG_CLOSED:
      return state;

    default:
      return state;
  }
}
