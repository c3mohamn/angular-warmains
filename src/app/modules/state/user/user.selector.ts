import { UserState } from './user.reducer';
import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { User } from '../../../models/user.model';

const getUserState = createFeatureSelector<UserState>('user');

export namespace UserQuery {
  export const getCurrentUser: MemoizedSelector<{}, User> = createSelector(
    getUserState,
    state => state
  );

  export const isLoggedIn: MemoizedSelector<{}, boolean> = createSelector(
    getUserState,
    state => state.username != null
  );

  export const isNotLoggedIn: MemoizedSelector<{}, boolean> = createSelector(
    getUserState,
    state => state.username === null
  );

  export const getCurrentUserName: MemoizedSelector<
    {},
    string
  > = createSelector(getUserState, state => state.username);
}
