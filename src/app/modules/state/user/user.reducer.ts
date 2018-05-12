import { User } from '../../../models/user.model';
import { UserActionTypes, UserActionsUnion } from './user.actions';

export interface UserState extends User {
  talents: any[];
}

export const initialState: UserState = {
  id: null,
  username: '',
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
      const isLoggedIn = action.payload.id.length > 0;
      const newState = Object.assign({}, state, action.payload, {
        isLoggedIn: isLoggedIn,
        error: null
      });

      return newState;

    case UserActionTypes.USER_ERROR:
      return Object.assign({}, state, initialState, {
        error: action.payload.error
      });

    case UserActionTypes.USER_LOGOUT:
      return Object.assign({}, state, initialState, {
        isLoggedIn: false
      });

    default:
      return state;
  }
}
