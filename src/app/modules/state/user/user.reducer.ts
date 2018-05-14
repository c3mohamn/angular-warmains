import { User } from '../../../models/user.model';
import { UserActionTypes, UserActionsUnion } from './user.actions';

export interface UserState extends User {
  talents: any[];
}

export const initialState: UserState = {
  id: null,
  username: null,
  email: '',
  role: 0,
  talents: [],
  token: ''
};

export function userReducer(
  state = initialState,
  action: UserActionsUnion
): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USER_SUCCESS:
      const newState = Object.assign({}, state, action.payload, {
        error: null
      });

      return newState;

    case UserActionTypes.USER_ERROR:
      return Object.assign({}, state, initialState, {
        error: action.payload.error
      });

    case UserActionTypes.USER_LOGOUT:
      return Object.assign({}, state, initialState, {});

    default:
      return state;
  }
}
