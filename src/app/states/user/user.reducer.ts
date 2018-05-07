import { Action } from 'redux';
import * as UserActions from './user.actions';
import { createSelector } from 'reselect';
import { User } from '../../models/user.model';

export interface UserState extends User {
  talents: any[];
}

export const UserReducer = function(
  state: UserState = null,
  action: Action
): UserState {
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      const user: User = (<UserActions.SetCurrentUserAction>action).user;
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        favorites: user.favorites,
        talents: [],
        token: user.token
      };
    case UserActions.UNSET_CURRENT_USER:
      return null;
    default:
      return state;
  }
};

export const getUsersState = (state): UserState => state.users;

export namespace UserSelector {
  export const getCurrentUser = createSelector(
    getUsersState,
    (state: UserState) => state
  );
}
