import { User } from '../../../models/user.model';
import * as fromUserActions from './user.actions';

export interface UserState extends User {
  talents: any[];
}

export const initialState: UserState = {
  id: null,
  username: '',
  email: '',
  role: 0,
  favorites: [],
  talents: [],
  token: ''
};

export function userReducer(
  state = initialState,
  action: fromUserActions.ALL
): UserState {
  switch (action.type) {
    case fromUserActions.USER_CLEAR:
      return initialState;

    case fromUserActions.USER_GET_ME_SUCCESS:
      const isLoggedIn = action.payload.id.length > 0;
      const newState = Object.assign({}, state, action.payload, {
        isLoggedIn: isLoggedIn
      });

      return newState;

    case fromUserActions.USER_LOGOUT:
      return Object.assign({}, state, initialState, {
        isLoggedIn: false
      });

    default:
      return state;
  }
}
