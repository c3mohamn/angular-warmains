import { Action, ActionCreator } from 'redux';
import { User } from '../../models/user.model';

export const SET_CURRENT_USER = '[User] logged in';
export const UNSET_CURRENT_USER = '[User] logged out';

export interface SetCurrentUserAction extends Action {
  user: User;
}

export interface UnsetCurrentUserAction extends Action {
  user: null;
}

export const setCurrentUser: ActionCreator<SetCurrentUserAction> =
  (user) => ({
    type: SET_CURRENT_USER,
    user: user
  });

export const unsetCurrentUser: ActionCreator<UnsetCurrentUserAction> =
  (user) => ({
    type: UNSET_CURRENT_USER,
    user: null
  });

